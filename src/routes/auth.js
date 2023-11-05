import express from "express";
const router = express.Router();

import AuthController from "../app/controllers/AuthController.js";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;