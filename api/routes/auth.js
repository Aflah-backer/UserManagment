import express from "express";
import { admin, login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login)

router.post("/admin", admin)

export default router;
