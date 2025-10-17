import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";
import { cookieConfig } from "../config/cookieConfig.js";

export const register = async (req, res) => {
  const validatedData = matchedData(req);

  try {
    validatedData.password = await hashPassword(validatedData.password);

    const newUser = new UserModel(validatedData);

    await newUser.save();

    res.status(201).json({ ok: true, msg: "Te has registrado exitosamente!" });
  } catch (e) {
    if (e.code === 11000)
      res.status(400).json({
        ok: false,
        msg: `Ese ${Object.keys(e.keyValue)} ya se encuentra en uso.`,
      });
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { email, password } = matchedData(req);

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user)
      return res.status(404).json({ ok: false, msg: "Ese usuario no existe." });

    // console.log(user);
    // console.log(password);
    // console.log(user.password);
    const decodedPassword = await comparePassword(password, user.password);

    if (!decodedPassword) {
      return res.status(404).json({ ok: false, msg: "Contraseña inorrecta" });
    }

    // if (!(await bcrypt.compare(password, user._doc.password)))
    //   res.status(401).json({ ok: false, msg: "La contraseña es incorrecta" });

    const payload = {
      sub: user._id,
      nombre: user.name,
      rol: user.role,
    };

    const token = signToken(payload);

    res.cookie("token", token, cookieConfig);

    const { password: userPassword, ...secureUser } = user._doc;

    res.status(200).json({
      ok: true,
      msg: "Sesión iniciada exitosamente!",
      data: secureUser,
    });
  } catch (e) {
    console.error("Error interno del servidor", e);
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(204).json({
      ok: true,
      msg: "Deslogueado correctamente",
    });
  } catch (e) {
    res.status(500).json({ ok: false, msg: "error interno del servidor" });
  }
};
