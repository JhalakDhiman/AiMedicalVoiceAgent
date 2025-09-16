import { openai } from "@/config/openRouterConfig";
import SessionChat from "@/models/sessionChat";
import Report from '@/models/report'


const PROMPT = `You are an AI Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and Conversation between Ai Medical Doctor ans user , generate a structured report with the following fields : 
    1. sessionId : a unique session identifier
    2. agent : the medical specialist name(e.g., "General Physician AI")
    3. user : name of the patient or "Anonymous" if not provided
    4. timestamp : current date and time in ISO format
    5. cheifComplaint : one-sentence summary of the main health concern
    6. summary : a 2-3 sentence summary of the main health concern
    7. symptoms : list of symptoms mentioned by the user
    8. duration : how long the user has experienced the symptoms 
    9. severity : mild,moderate, or severe
    10. medicationsMentioned : list of any medicines mentioned
    11. recommendations : list of AI suggestions(e.g. rest,see a doctor)

    Return the result in this JSON format:{
        "sessionId":"string",
        "agent":"string",
        "user":"string",
        "timestamp":"ISO Date string",
        "cheifComplaint":"string",
        "summary":"string",
        "symptoms":["symptom1","symptom2"],
        "duration":"string",
        "severity":"string",
        "medicationsMentioned":["med1","med2"],
        "recommendations":["rec1","rec2"],
    }

    Only include valid fields . Respond with nothing else  
`

export const POST = async (req, res) => {
    console.log("calling to get report ");
    const { sessionId, sessionDetail, messages } = await req.json();
    try {
        const USER_INPUT = "Ai Doctor Agent info : " + JSON.stringify(sessionDetail) + "Conversation : " + JSON.stringify(messages)
        const completion = await openai.chat.completions.create({
            model: 'z-ai/glm-4.5-air:free',
            messages: [
                { role: 'system', content: PROMPT },

                { role: 'user', content: USER_INPUT }
            ],
        });
        console.log("done with the call")
        const rawRes = completion.choices[0].message
        const temp = rawRes.content.trim().replace('```json', '').replace('```', '');
        const res = JSON.parse(temp);
        console.log("received the response : ",res);

        const newReport = await Report.create(res);

        const updatedSessionChat = await SessionChat.findOneAndUpdate(
            { sessionId: sessionId },
            { $set: { report: newReport._id },
              $push: { messages: { $each: messages } } 
            },
            { new: true }
        );

        return new Response(JSON.stringify({ res, message: "suggested doctors", success: true }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200
        });
    } catch (e) {
        console.error("Gemini Error:", e?.response?.data || e?.message || e);
        return new Response(JSON.stringify({ message: "error", success: false }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 500
        });
    }
}