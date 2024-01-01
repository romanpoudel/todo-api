import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { refreshAccessToken } from "../utils/tokenGenerator";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token",refreshAccessToken );

export default router;
