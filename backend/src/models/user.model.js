import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["emprendedor", "inversor"],
    },
    biography: {
      type: String,
    },
    projects: {
      type: [Schema.Types.ObjectId],
      ref: "Project",
    },
    investmenst: {
      type: [Schema.Types.ObjectId],
      ref: "Investments",
    },
    category: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema);

export default UserModel;
