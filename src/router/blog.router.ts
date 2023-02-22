import express from "express";
import path from "path";
import blogController from "../controllers/blog.controller";
import authMiddleware from "../middlewares/auth.middleware";
import upload from "../config/multer.config";
const router = express.Router();

router.use("/files", express.static(path.resolve(__dirname, "../../" + "public/uploads")));
router.delete("/delete/:id", authMiddleware.checkAuthentication,blogController.deletePost);
router.patch("/update/:id", authMiddleware.checkAuthentication, upload.single("file"), blogController.updatePost);
router.post("/create", authMiddleware.checkAuthentication, upload.single("file"), blogController.createNewPost);
router.get("/:id", authMiddleware.checkAuthentication, blogController.findPostById);
router.get("/", authMiddleware.checkAuthentication, blogController.findAllPosts);

export default router;
