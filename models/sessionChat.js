import mongoose from "mongoose";

const SessionChatSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notes: {
      type: String,
      required: true,
      trim: true,
    },
    selectedDoctor:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor", 
    },
    sessionId: {
      type: String,
      required: true
    },
    report:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Report"
    },
    messages: [
      {
        role: { type: String, required: true },
        text: { type: String, required: true }
      }
    ]
    
  },
  { timestamps: true }
);

export default mongoose.models.SessionChat ||mongoose.model("SessionChat", SessionChatSchema);
