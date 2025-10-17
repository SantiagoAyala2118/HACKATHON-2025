import { matchedData, param } from "express-validator";
import { ProjectModel } from "../models/project.model.js";
import UserModel from "../models/user.model.js";

export const createProject = async (req, res) => {
  const validatedData = matchedData(req);
  const { userData } = req;

  try {
    if (
      validatedData.minInvestment < 0 ||
      validatedData.minInvestment > validatedData.fundingGoal
    )
      res.status(400).json({
        ok: false,
        msg: "Por favor, introduzca un monto mínimo válido",
      });

    validatedData.owner = userData.sub;

    const newProject = new ProjectModel(validatedData);

    await newProject.save();

    await UserModel.findByIdAndDelete(userData.sub, {
      $push: { projects: newProject._id },
    });

    res
      .status(201)
      .json({ ok: true, msg: "Proyecto lanzado!", data: newProject });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};

export const getAllProjects = async (req, res) => {
  const { sub } = req.userData;

  try {
    const projects = await ProjectModel.find({ owner: sub });
    if (!projects)
      return res
        .status(404)
        .json({ ok: false, msg: "Aun no tienes ningún proyecto" });

    res.status(200).json({ ok: true, projects: projects });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};

export const getProjectByCategory = async (req, res) => {
  const categories = matchedData(req);

  try {
    const projects = await ProjectModel.find({ category: categories });

    if (!projects)
      return res.status(404).json({
        ok: false,
        msg: "No se encontraron proyectos dentro de esta categoría",
      });

    res.status(200).json({ ok: true, projects: projects });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};

export const deleteProject = async (req, res) => {
  const { idProject } = matchedData(req);

  try {
    const project = await ProjectModel.findById(idProject);

    if (!project)
      return res.status(404).json({ ok: false, msg: "Ese proyecto no existe" });

    await project.deleteOne();

    res.status(200).json({ ok: true, msg: "Proyecto eliminado" });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};

export const updateProject = async (req, res) => {
  const { idProject, ...validatedData } = matchedData(req);

  try {
    const project = await ProjectModel.findById(idProject);

    if (!project)
      return res.status(404).json({ ok: false, msg: "Ese proyecto no existe" });

    Object.keys(validatedData).forEach((k) => {
      project[k] = validatedData[k];
    });

    await project.save();

    res.status(200).json({ ok: true, msg: "El proyecto ha sido actualizado" });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
};
