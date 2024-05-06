import express from "express";
import AuthController from "../controllers/authcontrollers.js";
import blogcontrollers from "../controllers/blogcontrollers.js";
import categorycontroller from "../controllers/categorycontroller.js";
import multer from "multer";
import checkisuserauthenticate from "../middlewares/authmiddlewares.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/upload/`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },

});


const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userreg);
router.post("/user/login", AuthController.userlogin);


//protected routes...

router.get("/get/allblogs", checkisuserauthenticate, blogcontrollers.getallblogs);
router.post("/add/blog", upload.single("thumbnail"), checkisuserauthenticate, blogcontrollers.addnewblog);
router.get("/get/blog/:id", checkisuserauthenticate, blogcontrollers.getsingblog);


router.get("/get/categories", checkisuserauthenticate, categorycontroller.getallcategory);
router.post("/add/categories", checkisuserauthenticate, categorycontroller.addnewcategory);


export default router;

