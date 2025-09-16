import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    specialist:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    agentPrompt:{
        type:String,
        required:true
    },
    voiceId:{
      type:String,
      required:true
    },
    subscriptionRequired:{
      type:Boolean,
      default:false,
    }
  }
);

const Doctor = mongoose.models?.Doctor || mongoose.model("Doctor", doctorSchema);
export default Doctor;

