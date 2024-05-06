import { raw } from "express";
import blogModel from "../models/blog_mod.js";
class blogcontrollers {

    static getallblogs = async (req, res) => {
        try {
            const fetchallblogs = await blogModel.find({ user: req.user._id });
            return res.status(200).json(fetchallblogs);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    static addnewblog = async (req, res) => {
        const { title, category, description } = req.body;
        try {
            if (title && description) {
                const addblog = new blogModel({
                    title: title,
                    description: description,
                    // category: category,
                    thumbnail: req.file.filename,
                    user: req.user._id,
                });

                const savedblog = await addblog.save();
                if (savedblog) {
                    return res.status(200).json({ message: "Blog added sucessfully" })
                }
            } else {
                res.status(400).json({ message: "All fields are mandatory" });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
    static getsingblog = async (req, res) => {
        // res.send("getsingle blog");
        const { id } = req.params;

        try {
            if (id) {
                const fetchblogbyid = await blogModel.findById(id);
                return res.status(200).json(fetchblogbyid);
            } else {
                return res.status(400).json({ message: "Invalid URL" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
}

export default blogcontrollers;
