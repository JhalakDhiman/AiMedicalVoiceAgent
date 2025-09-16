import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
    },
    agent: {
      type: String,
    },
    user: {
      type: String,
    },
    timestamp: {
      type: Date,
    },
    cheifComplaint: {
      type: String,
    },
    summary: {
      type: String,
    },
    symptoms: [
      {
        type: String,
      }
    ],
    duration: {
      type: String,
    },
    severity: {
      type: String,
    },
    medicationsMentioned: [
      {
        type: String,
      }
    ],
    recommendations:[
      {
        type:String,
      }
    ]
  }
);

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
