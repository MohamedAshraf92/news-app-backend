import { Router } from "express";
import { login, addUser } from "../controllers/user.js";

const router = Router();

router.post("/signIn", login);

router.post("/signup", addUser);

export default router;
