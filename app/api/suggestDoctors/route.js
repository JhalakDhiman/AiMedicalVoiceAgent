import { openai } from "@/config/openRouterConfig";
import { doctorAgents } from "@/shared/list";

export const POST = async(req,res)=>{

    const {notes} = await req.json();
    try{
      console.log(notes);
      console.log("hello here")
        const completion = await openai.chat.completions.create({
            model: 'z-ai/glm-4.5-air:free',
            messages: [
              { role: 'system',content:
              `You are a medical assistant AI.\n` +
              `From the following list of doctors, recommend only relevant ones based on the user's symptoms.\n` +
              `Use ONLY the following JSON structure (no extra fields):\n\n` +
              `${JSON.stringify(doctorAgents)}`+
              `Do not add any explanation or markdown. Just return a JSON array of matching doctors with only id, specialist, description, image, and agentPrompt.`},
              
              { role: 'user',content: 'User Notes/Symptoms:'+notes+'Depends on user and symptoms , please suggest list of doctors , return object in json only'}
            ],
          });
          console.log("done with the call")
        const rawRes = completion.choices[0].message
        const temp = rawRes.content.trim().replace('```json','').replace('```','');
        const res = JSON.parse(temp);
        return new Response(JSON.stringify({res,message:"suggested doctors",success:true}),{
            headers:{
                'Content-Type':'application/json',
            },
            status:200
        });
    } catch (e) {
      console.error("Gemini Error:", e?.response?.data || e?.message || e);
      return new Response(JSON.stringify({message:"error",success:false}),{
            headers:{
                'Content-Type':'application/json',
            },
            status:500
        });
    }
}