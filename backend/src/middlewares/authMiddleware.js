import { verifyToken } from "../helpers/jwt.helper.js"

export const authMiddleware = (req, res, next)=>{
    try {
        const { token } = req.cookies
        const decode = verifyToken(token)
        req.userData = decode
        next()
    } catch (e) {
        res.status(e.statusCode).json({ok: false, msg: e.msg})
    }
}