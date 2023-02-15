import { Router } from "express";
import controller from "../controllers/upload.controller";
import upload from "../config/multer.config";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.delete("/delete/:id", authMiddleware.checkAuthentication, controller.deleteImage);
router.post("/save", authMiddleware.checkAuthentication, upload.single("file"), controller.saveImage);
router.get("/", authMiddleware.checkAuthentication, controller.allPictures);

export default router;
