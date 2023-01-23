import { Router } from "express";
import blogController from "../controller/blog.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.use(authMiddleware.checkAuthentication);

router.delete("/posts/delete/:id", blogController.deletePost);
router.patch("/posts/update/:id", blogController.updatePost);
router.post("/posts/create", blogController.createNewPost);
router.get("/posts/:id", blogController.findPostById);
router.get("/posts", blogController.findAllPosts);

export default router;
