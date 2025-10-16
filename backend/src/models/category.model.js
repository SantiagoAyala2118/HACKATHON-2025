import { Schema, model } from "mongoose";

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const CategoryModel = model("Category", CategorySchema);

export default CategoryModel;
