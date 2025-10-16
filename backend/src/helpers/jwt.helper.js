import jwt from "jsonwebtoken"

export const signToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token)=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        throw {statusCode: 401, msg: "Provea un token válido"}
    }
}