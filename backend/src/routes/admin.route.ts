import { Router } from "express";
import { AdminUserController } from "../controllers/admin/user.controller";
import {
  adminOnlyMiddleware,
  authorizedMiddleware,
} from "../middleware/authorization.middleware";

const router = Router();
const adminUserController = new AdminUserController();

router.use(authorizedMiddleware);
router.use(adminOnlyMiddleware);

router.get("/", adminUserController.getAllUsers);

export default router;
