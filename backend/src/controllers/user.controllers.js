import { matchedData } from "express-validator";
import UserModel from "../models/user.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import bcrypt from 'bcrypt';
import { signToken } from "../helpers/jwt.helper.js";
import { cookieConfig } from "../config/cookieConfig.js";

export const register = async(req, res)=>{
    const validatedData = matchedData(req)
    
    try {

        validatedData.password = await hashPassword(validatedData.password)

        const newUser = new UserModel(validatedData)

        res.status(201).json({ok: true, msg: "Te has registrado exitosamente!"})
    } catch (e) {
        if(e.code === 11000)
            res.status(400).json({ok: false, msg: `Ese ${Object.keys(e.keyValue)} ya se encuentra en uso.`})
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}

export const login = async(req, res)=>{
    
    const {email, password} = matchedData(req)
    
    try {
        const user = await UserModel.findOne({email})

        if(!user) return res.status(404).json({ok: false, msg: "Ese usuario no existe."})

        if(!await bcrypt.compare(password, user.password))
            res.status(401).json({ok: false, msg: "La contraseña es incorrecta"})

        const payload = {
            sub: user._id,
            nombre: user.name,
            rol: user.role
        }

        const token = signToken(payload)

        res.cookie("token", token, cookieConfig)

        const {password, ...secureUser} = user._doc

        res.status(200).json({ok: true, msg: "Sesión iniciada exitosamente!", data: secureUser})

    } catch (e) {
        res.status(500).json({ok: false, msg: "error interno del servidor"})
    }
}