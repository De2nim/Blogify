import authModel from "../models/auth_mod.js";
import auth_mod from "../models/auth_mod.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

class AuthController {
    static userreg = async (req, res) => {
        // res.send("user registration");
        const { username, email, password } = req.body;

        try {
            if (username && email && password) {
                const isUser = await auth_mod.findOne({ email: email });
                if (isUser) {
                    return res.status(400).json({ message: "Email already exists" });
                } else {
                    //password hashing 
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedpassword = await bcryptjs.hash(password, genSalt);

                    const newuser = authModel(
                        {
                            username,
                            email,
                            password: hashedpassword,
                        }
                    );

                    const savedUser = await newuser.save();

                    if (savedUser) {
                        return res.status(200).json({ message: "User sucessfully Registered" });
                    }
                }
            } else {
                return res.status(400).json({ message: "all fields are mandatory" });
            }
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    static userlogin = async (req, res) => {
        // res.send("user login");
        const { email, password } = req.body;

        try {
            if (email && password) {
                const isemail = await authModel.findOne({ email: email });
                if (isemail) {
                    if (isemail.email === email && await bcryptjs.compare(password, isemail.password)) {
                        // generate token....
                        const token = jwt.sign({ userID: isemail._id }, "pleaseSubscribe", { expiresIn: "2d" });
                        return res.status(200).json(
                            {
                                message: "Login Sucessfully",
                                token,
                                name: isemail.username,
                            }
                        );
                    } else {
                        return res.status(400).json({ message: "Wrong Credential!" });
                    }
                } else {
                    return res.status(400).json({ message: "Email ID not found" });
                }
            } else {
                return res.status(400).json({ message: "All fields are mandatory" });
            }
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
}

export default AuthController;
