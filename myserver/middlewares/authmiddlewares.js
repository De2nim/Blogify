import jwt from "jsonwebtoken";
import authModel from "../models/auth_mod.js";

const checkisuserauthenticate = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];

            //verify token..

            const { userID } = jwt.verify(token, "pleaseSubscribe");
            req.user = await authModel.findById(userID).select("--password");
            next();
        } catch (error) {
            return res.status(400).json({ message: "Unauthorized user" });
        }
    } else {
        return res.status(400).json({ message: "Unauthorized user" });
    }
}

export default checkisuserauthenticate;