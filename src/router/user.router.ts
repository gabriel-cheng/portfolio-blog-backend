import { Router } from "express";
import userController from "../controller/user.controller";

const router = Router();

router.delete("/users/delete/:id", userController.deleteUser);
router.put("/users/update/password/:id", userController.updateUserPassword);
router.patch("/users/update/:id", userController.updateUser);
router.post("/users/auth/login", userController.login);
router.post("/users/register", userController.createNewUser);
router.get("/users/:id", userController.findUserById);
router.get("/users", userController.findAllUsers);

export default router;
