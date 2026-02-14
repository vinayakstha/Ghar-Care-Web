import { Router } from "express";
import { authorizedMiddleware } from "../middleware/authorization.middleware";
import { UserBookingController } from "../controllers/booking.controller";

const router = Router();
const bookingController = new UserBookingController();

router.use(authorizedMiddleware);

router.post("/", bookingController.createBooking);

router.patch("/:id/cancel", bookingController.cancelBooking);

export default router;
