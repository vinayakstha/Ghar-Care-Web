"use client";

import { useState, useEffect } from "react";
import BookingCard from "./BookingCard";
import { handleGetBookingsByUser } from "@/lib/actions/booking-action";

interface Booking {
  serviceImage: string;
  serviceName: string;
  price: number;
  bookingDate: string;
  bookingTime: string;
  location: string;
  status: "pending" | "cancelled" | "completed";
}

export default function MyBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      const response = await handleGetBookingsByUser();

      if (response.success) {
        // Map backend data to BookingCard props
        const mappedBookings: Booking[] = response.data.map((b: any) => ({
          serviceImage: `${IMAGE_BASE_URL}${b.serviceId.serviceImage}`, // prepend base URL
          serviceName: b.serviceId.serviceName,
          price: Number(b.price), // convert string to number
          bookingDate: b.bookingDate,
          bookingTime: b.bookingTime,
          location: b.location,
          status: b.status,
        }));
        setBookings(mappedBookings);
      } else {
        console.error(response.message);
      }

      setLoading(false);
    }

    fetchBookings();
  }, []);

  return (
    <div className="w-full p-4 md:p-6 space-y-6 min-h-screen">
      <h1 className="text-lg font-semibold text-gray-700">My Bookings</h1>

      {loading ? (
        <p className="text-gray-500">Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="pb-6 space-y-4">
          {bookings.map((booking, index) => (
            <BookingCard
              key={index}
              serviceImage={booking.serviceImage}
              serviceName={booking.serviceName}
              price={booking.price}
              bookingDate={booking.bookingDate}
              bookingTime={booking.bookingTime}
              location={booking.location}
              status={booking.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
