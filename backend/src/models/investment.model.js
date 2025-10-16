import { Schema, model } from "mongoose";

const InvestmentSchema = new Schema(
  {
    investor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendiente", "Confirmada", "Cancelada"],
    },
    details: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const InvestmentModel = model("Investment", InvestmentSchema);

export default InvestmentModel;
