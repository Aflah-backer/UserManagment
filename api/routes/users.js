import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updatedUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", verifyUser, updatedUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET USER
router.get("/:id", verifyUser, getUser);

//GET USERS
router.get("/", getUsers);

export default router;
