import { response } from "express";
import categoryModel from "../models/categ_mod.js";

class categorycontroller {
    static getallcategory = async (req, res) => {
        try {
            const fetchallcategories = await categoryModel.find({});
            return res.status(200).json(fetchallcategories);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    static addnewcategory = async (req, res) => {
        // res.send("add new categories");
        const { title } = req.body;
        try {
            if (title) {
                const newcat = new categoryModel({
                    title,
                });
                const savedcat = await newcat.save();
                if (savedcat) {
                    return res.status(200).json({ message: "Category added Sucessfully" });
                }
            } else {
                return res.status(400).json({ message: "all fields are required" });
            }
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

}

export default categorycontroller;