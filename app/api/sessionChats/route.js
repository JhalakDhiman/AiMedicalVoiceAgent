import SessionChat from "@/models/sessionChat";
import { connectDB } from "@/utils/database";
import User from "@/models/user";
import Doctor from "@/models/doctor";
import { v4 as uuidv4 } from 'uuid';

export const POST = async(req)=>
{
    try{
        await connectDB();
        const {notes,selectedDoctor,email}  = await req.json();
        const user = await User.findOne({email:email});

        if(!user){
            return new Response(JSON.stringify({success:false,result,message:"User do not exist"}),{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }

        const doctor = await Doctor.findOne({specialist:selectedDoctor.specialist});
        if(!doctor){
            return new Response(JSON.stringify({success:false,result,message:"Doctor do not exist"}),{
                status:200,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }

        const sessionId = uuidv4();
        const result = await SessionChat.create({
            sessionId,
            createdBy:user._id,
            notes:notes,
            selectedDoctor:doctor._id,
            createdOn :(new Date()).toString()
        })

        return new Response(JSON.stringify({success:true,result,message:"Session created"}),{
            status:200,
            headers:{
                'Content-Type':'application/json'
            }
        })
    } catch(e){
        console.log(e);
        return new Response(JSON.stringify({success:false,message:"error occured"}),{
            status:500,
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
}

