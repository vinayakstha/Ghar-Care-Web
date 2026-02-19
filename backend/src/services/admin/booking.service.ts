import { HttpError } from "../../errors/http-error";
import { BookingRepository } from "../../repositories/booking.repository";

const bookingRepository = new BookingRepository();

export class AdminBookingService {
  async updateBookingStatus(bookingId: string, status: string) {
    const booking = await bookingRepository.getBookingById(bookingId);

    if (!booking) {
      throw new HttpError(404, "Booking not found");
    }

    // Optional: you can add validation for allowed status values
    const allowedStatuses = ["pending", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      throw new HttpError(400, "Invalid booking status");
    }

    const updatedBooking = await bookingRepository.updateBookingStatus(
      bookingId,
      status,
    );

    if (!updatedBooking) {
      throw new HttpError(500, "Failed to update booking status");
    }

    return updatedBooking;
  }
}
