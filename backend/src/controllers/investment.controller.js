import { matchedData } from "express-validator";
import InvestmentModel from "../models/investment.model.js";
import { ProjectModel } from "../models/project.model.js";
import UserModel from "../models/user.model.js";

export const addInvestment = async (req, res) => {
  const { project, amount } = matchedData(req);
  const { userData } = req;

  try {
    const projectFounded = await ProjectModel.findById(project);

    if (!projectFounded)
      return res.status(404).json({ ok: false, msg: "Proyecto no encontrado" });

    if (amount < projectFounded.minInvestment)
      return res
        .status(400)
        .json({
          ok: false,
          msg: `Invierte un monto igual o mayor a $${projectFounded.minInvestment}`,
        });

    if (projectFounded.status === "Financiado")
      return res
        .status(400)
        .json({
          ok: false,
          msg: "El proyecto ya alcanzó su meta de financiación.",
        });

    const newFundingTotal = projectFounded.currentFunding + amount;
    let newStatus = projectFounded.status;

    if (newFundingTotal >= projectFounded.fundingGoal) {
      newStatus = "Financiado";
    }

    const newInvestment = new InvestmentModel({
      amount: amount,
      investor: userData.sub,
      project: project,
      status: "Confirmada",
    });

    await newInvestment.save();

    await ProjectModel.findByIdAndUpdate(projectFounded._id, {
      $inc: { currentFunding: amount },
      $set: { status: newStatus },
      $push: { investors: newInvestment._id },
    });

    await UserModel.findByIdAndUpdate(userData.sub, {
      $push: { investments: newInvestment._id },
    });

    res
      .status(201)
      .json({
        ok: true,
        msg: `¡Éxito! Has invertido $${amount} para el proyecto ${projectFounded.title}.`,
      });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({
        ok: false,
        msg: "Error interno del servidor al procesar la inversión.",
      });
  }
};
