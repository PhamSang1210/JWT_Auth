import express from "express";
const router = express.Router();

import UserController from "../app/controllers/UserController.js";
import verifyTokenAndAdmin from "../app/middleware/verifyTokenAndAdmin.js";
import verifyToken from "../app/middleware/verifyToken.js";

// [/v1/user/]
router.delete(
    "/delete/:id",
    verifyTokenAndAdmin.verifyTokenAndAdmin,
    UserController.delete
);
router.put("/update/:id", UserController.update);
router.get("/", verifyToken.verifyToken, UserController.getAllUsers);

export default router;
