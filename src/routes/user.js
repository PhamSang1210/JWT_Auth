import express from "express";
const router = express.Router();

import UserController from "../app/controllers/UserController.js";

router.delete("/delete/:id", UserController.delete);
router.put("/update/:id", UserController.update);
router.get("/", UserController.getAllUsers);
export default router;
