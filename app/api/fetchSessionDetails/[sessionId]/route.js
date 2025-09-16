import SessionChat from "@/models/sessionChat";
import Doctor from "@/models/doctor";
import { connectDB } from "@/utils/database";
import { requireAuth } from "@/utils/middleware/auth";
import Report from '@/models/report'

export const GET = async (req, { params }) => {
    await connectDB();
    try {
        const { sessionId } = await params;

        if (sessionId == 'all') {
            const {user}  = await requireAuth(req);
            console.log("user:",user);

            const sessionChats = await SessionChat.find({createdBy:user.id}).populate('selectedDoctor').populate('report');
            
            return new Response(JSON.stringify({ success: true, sessionChats, message: "Session data fetched successfully" }), {
                headers: {
                    'Content-Type': 'application/json',
                },
                status: 200
            })

        }
        else {
            const sessionChat = await SessionChat.findOne({ sessionId: sessionId }).populate('selectedDoctor');
            console.log(sessionChat)

            if (!sessionChat) {
                return new Response(JSON.stringify({ success: false, message: "Session data not found" }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    status: 404
                })
            }

            return new Response(JSON.stringify({ success: true, sessionChat, message: "Session data fetched successfully" }), {
                headers: {
                    'Content-Type': 'application/json',
                },
                status: 200
            })
        }
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify({ message: "error occured", success: false }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}