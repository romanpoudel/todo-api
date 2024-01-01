import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token",refreshAccessToken );

export default router;
