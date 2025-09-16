import Doctor from '@/models/doctor'
import { connectDB } from "@/utils/database";

export const POST = async (req, res) => {
    try {
        await connectDB();

        const { specialist, description, image, agentPrompt } = await req.json();

        if (!specialist || !description || !image || !agentPrompt) {
            return new Response(JSON.stringify({ message: "all fields are required", success: false }), {
                status: 403,
                headers: { "Content-Type": "application/json" }
            });
        }

        const doctor = await Doctor.create({ specialist, description, image, agentPrompt });

        return new Response(JSON.stringify({ message: "Doctor added", success: true, doctor }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.log("Error occurred while adding doctor: ", error);
        return new Response(JSON.stringify({ message: "error occurred", success: false }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}