import { matchedData } from "express-validator"
import CategoryModel from "../models/category.model.js"

export const addCategory = async(req, res)=>{
    
    const {title} = matchedData(req)

    try {
        const newCategory = new CategoryModel({title})
        await newCategory.save()
    } catch (e) {
        res.status(500).json({ok: false, msg: "error en el servidor"})
    }
}