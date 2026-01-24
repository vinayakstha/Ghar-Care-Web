import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorizedMiddleware } from "../middleware/authorization.middleware";
import { uploads } from "../middleware/upload.middleware";

let userController = new UserController();
const router = Router();

router.put(
  "/update-profile",
  authorizedMiddleware,
  uploads.single("profilePicture"),
  userController.updateProfile,
);

export default router;
