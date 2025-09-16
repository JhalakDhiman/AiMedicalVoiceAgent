import { connectDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from 'bcrypt'

export const POST = async(req,res)=>{
    try{

        await connectDB();
        const {email,password,firstName,lastName,age,confirmPassword} = await req.json();
        console.log(email,password,firstName,lastName,age,confirmPassword);

        if(!email || !password || !confirmPassword || !firstName || !lastName || !age){
            return new Response(JSON.stringify({ message: "Please fill all fields" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }
        console.log("inside post api");
        if(password!=confirmPassword){
            return new Response(JSON.stringify({ message: "Passwords don't match" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }

        const user = await User.findOne({email});
        if(user){
            return new Response(JSON.stringify({ message: "user already exists" }), {
                status: 400,
                headers: { "Content-Type": "application/json" }
              });
        }

        // const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);

        // if(recentOtp.length==0){
        //     return res.status(400).json({
        //         success:false,
        //         message:"otp not found"
        //     })
        // }

        // console.log("recent otp is : ",recentOtp[0].otp);

        // if(recentOtp[0].otp!=otp){
        //     return res.status(401).json({
        //         success:false,
        //         message:"otp is incorrect"
        //     })
        // }

        const hashedPassword = await bcrypt.hash(password,10);

        const userData = await User.create({
            firstName,
            lastName,
            email,
            age,
            password:hashedPassword,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        return new Response(JSON.stringify({ 
            message: "user registered successfully",
            userData
        }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });

    } catch(error){
        console.log(error);
        return new Response(
            JSON.stringify({
                success:false,
                message:"error occured"
            }),{
                headers:{
                    'Content-Type':'application/json'
                },
                status:500
            })
    }
}