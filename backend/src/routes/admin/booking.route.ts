import { Router } from "express";
import {
  authorizedMiddleware,
  adminOnlyMiddleware,
} from "../../middleware/authorization.middleware";
import { AdminBookingController } from "../../controllers/admin/booking.controller";

const router = Router();
const bookingController = new AdminBookingController();

router.use(authorizedMiddleware);
router.use(adminOnlyMiddleware);

router.put("/:id/status", bookingController.updateBookingStatus);

export default router;
