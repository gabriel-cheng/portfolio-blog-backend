import { Router } from "express";
import controller from "../controller/index.controller";
const router = Router();

router.delete("/posts/delete/:id", controller.deletePost);
router.patch("/posts/update/:id", controller.updatePost);
router.post("/posts/create", controller.createNewPost);
router.get("/posts/:id", controller.findPostById);
router.get("/posts", controller.findAllPosts);

export default router;
