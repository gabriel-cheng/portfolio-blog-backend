import { Router } from "express";
import blogController from "../controller/blog.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.delete("/posts/delete/:id", authMiddleware.checkAuthentication,blogController.deletePost);
router.patch("/posts/update/:id", authMiddleware.checkAuthentication, blogController.updatePost);
router.post("/posts/create", authMiddleware.checkAuthentication, blogController.createNewPost);
router.get("/posts/:id", authMiddleware.checkAuthentication, blogController.findPostById);
router.get("/posts", authMiddleware.checkAuthentication, blogController.findAllPosts);

export default router;
