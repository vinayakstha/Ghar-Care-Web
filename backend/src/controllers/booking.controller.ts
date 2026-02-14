import { Request, Response, NextFunction } from "express";
import { UserBookingService } from "../services/booking.service";
import { CreateBookingDto } from "../dtos/booking.dto";

const bookingService = new UserBookingService();

export class UserBookingController {
  //Create Booking
  async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedData = CreateBookingDto.parse(req.body);

      const userId = (req as any).user.id; // from auth middleware

      const booking = await bookingService.createBooking(
        userId,
        parsedData.serviceId,
        parsedData.bookingDate,
        parsedData.bookingTime,
        parsedData.note,
      );

      return res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: booking,
      });
    } catch (error: any) {
      return res.status(error.status ?? 500).json({
        success: false,
        message: error.message ?? "Internal server error",
      });
    }
  }

  //Cancel Booking
  async cancelBooking(req: Request, res: Response, next: NextFunction) {
    try {
      const bookingId = req.params.id;
      const userId = (req as any).user.id;

      const booking = await bookingService.cancelBooking(bookingId, userId);

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully",
        data: booking,
      });
    } catch (error: any) {
      return res.status(error.status ?? 500).json({
        success: false,
        message: error.message ?? "Internal server error",
      });
    }
  }
}
