import express from "express";
import { deleteUser, getUsers, updatedUser } from "../controllers/user.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//GETALLUSERS
router.get("/users", verifyAdmin, getUsers);

//UPDATE USERS
router.put("/edit/:id", verifyAdmin, updatedUser);

//DELETE USER
router.delete("/delete/:id", verifyAdmin, deleteUser);

export default router;
