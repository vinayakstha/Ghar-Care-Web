"use client";

import { useEffect, useState } from "react";
import ManageBookingCard from "./ManageBookingCard";
import { useRouter } from "next/navigation";
import {
  handleGetAllBookings,
  handleUpdateBookingStatus,
} from "@/lib/actions/admin/booking-action";

interface Booking {
  _id: string;
  userId: any;
  serviceId: {
    _id: string;
    serviceName: string;
    serviceImage: string;
    price: string;
  };
  bookingDate: string;
  bookingTime: string;
  price: string;
  location: string;
  status: "pending" | "completed" | "cancelled";
}

export default function ManageBooking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const result = await handleGetAllBookings();
      if (result.success && result.data) {
        setBookings(result.data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (
    bookingId: string,
    status: Booking["status"],
  ) => {
    const result = await handleUpdateBookingStatus(bookingId, status);
    if (result.success && result.data) {
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status } : b)),
      );
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading bookings...</div>;
  }

  return (
    <div className="w-full p-4 md:p-6 space-y-6 min-h-screen">
      <h1 className="text-lg font-semibold text-gray-700">Bookings</h1>
      <div className="pb-6 space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <ManageBookingCard
              key={booking._id}
              serviceImage={`${IMAGE_BASE_URL}${booking.serviceId.serviceImage}`} // correct nested path
              serviceName={booking.serviceId.serviceName} // correct nested path
              user={booking.userId.username}
              price={booking.price}
              bookingDate={booking.bookingDate}
              bookingTime={booking.bookingTime}
              location={booking.location}
              status={booking.status}
            />
          ))
        ) : (
          <div className="text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
}
