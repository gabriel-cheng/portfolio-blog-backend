import { Router } from "express";
import blogController from "../controllers/blog.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.delete("/delete/:id", authMiddleware.checkAuthentication,blogController.deletePost);
router.patch("/update/:id", authMiddleware.checkAuthentication, blogController.updatePost);
router.post("/create", authMiddleware.checkAuthentication, blogController.createNewPost);
router.get("/:id", authMiddleware.checkAuthentication, blogController.findPostById);
router.get("/", authMiddleware.checkAuthentication, blogController.findAllPosts);

export default router;
