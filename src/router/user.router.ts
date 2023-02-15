import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.delete("/delete/:id", userController.deleteUser);
router.put("/update/password/:id", userController.updateUserPassword);
router.patch("/update/:id", userController.updateUser);
router.post("/auth/login", userController.login);
router.post("/register", userController.createNewUser);
router.get("/:id", userController.findUserById);
router.get("/", userController.findAllUsers);

export default router;
