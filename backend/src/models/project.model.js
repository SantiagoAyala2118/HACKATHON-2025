import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: {
      //* Título
      type: String,
      required: true,
    },
    owner: {
      //* Dueño
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    summary: {
      //* Resumen del emprendimiento
      type: String,
      required: true,
    },
    businessModel: {
      //* Modelo de negocios
      type: String,
    },
    marketPotencial: {
      //* Potencial en el mercado
      type: String,
    },
    fundingGoal: {
      //* Monto total de financiación buscado
      type: Number,
      required: true,
    },
    minInvestment: {
      //* Cantidad mínima de inversión por inversor
      type: Number,
    },
    currentFunding: {
      //* Monto recaudado hasta la fecha
      type: Number,
      default: 0,
    },
    status: {
      //* Estado del proyecto actual
      type: String,
      enum: ["Buscando", "Financiado"],
      default: "Buscando",
    },
    category: {
      //* Categoría para facilitar la búsqueda
      type: [Schema.Types.ObjectId],
      ref: "Category",
    },
    documents: {
      //* URLs o paths a documentos importantes, como finanzas
      type: [String],
    },
    investors: {
      //* Todas las transacciones relacionadas al proyecto
      type: [Schema.Types.ObjectId],
      ref: "Investments",
    },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model("Project", ProjectSchema);
