
import { connectDB } from "@/utils/database";
import User from "@/models/user";
import { requireAuth } from "@/utils/middleware/auth";

export const POST = async(req)=>
{
    try{
        await connectDB();
        
        const {user}  = await requireAuth(req);
        const userId = user.id;

        const userData = await User.findById(userId);

        if(!userData){
            return new Response(JSON.stringify({success:false,message:"User is not authenticated"}),{
                status:400,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        }
        userData.subscription = true;
        await userData.save();
        return new Response(JSON.stringify({success:true,message:"Subscription updated"}),{
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

