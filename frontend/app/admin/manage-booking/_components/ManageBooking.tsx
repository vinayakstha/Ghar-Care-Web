"use client";

import { useEffect, useState } from "react";
import ManageBookingCard from "./ManageBookingCard";
import {
  Calendar,
  CheckCircle,
  Clock,
  MapPin,
  User,
  X,
  XCircle,
} from "lucide-react";
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      if (selectedBooking && selectedBooking._id === bookingId) {
        setSelectedBooking({ ...selectedBooking, status }); // update modal
      }
    }
  };

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setIsModalOpen(false);
  };

  if (loading)
    return <div className="p-6 text-gray-500">Loading bookings...</div>;

  return (
    <div className="w-full p-4 md:p-6 space-y-6 min-h-screen">
      <h1 className="text-lg font-semibold text-gray-700">Bookings</h1>
      <div className="pb-6 space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <ManageBookingCard
              key={booking._id}
              serviceImage={`${IMAGE_BASE_URL}${booking.serviceId.serviceImage}`}
              serviceName={booking.serviceId.serviceName}
              user={booking.userId.username}
              price={booking.price}
              bookingDate={booking.bookingDate}
              bookingTime={booking.bookingTime}
              location={booking.location}
              status={booking.status}
              onView={() => openModal(booking)} // open modal on view
            />
          ))
        ) : (
          <div className="text-gray-500">No bookings found.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-6 w-96 max-w-[90vw] space-y-4 relative shadow-xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            {/* Booking Title */}
            <h2 className="text-xl font-semibold flex items-center gap-2">
              {selectedBooking.serviceId.serviceName}
            </h2>

            {/* Image */}
            <img
              src={`${IMAGE_BASE_URL}${selectedBooking.serviceId.serviceImage}`}
              alt={selectedBooking.serviceId.serviceName}
              className="w-full h-40 object-cover rounded-md"
            />

            {/* Details */}
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                <span>{selectedBooking.userId.username}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{selectedBooking.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span>{selectedBooking.bookingDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-500" />
                <span>{selectedBooking.bookingTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Price:</span>
                <span>Rs {selectedBooking.price}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-semibold text-white`}
                  style={{
                    backgroundColor:
                      selectedBooking.status === "pending"
                        ? "#006BAA"
                        : selectedBooking.status === "completed"
                          ? "#00AA00"
                          : "#FF0000",
                  }}
                >
                  {selectedBooking.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Status Buttons */}
            {selectedBooking.status === "pending" && (
              <div className="flex gap-2 mt-4 justify-end">
                <button
                  onClick={() =>
                    handleStatusChange(selectedBooking._id, "completed")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  <CheckCircle size={16} /> Completed
                </button>
                <button
                  onClick={() =>
                    handleStatusChange(selectedBooking._id, "cancelled")
                  }
                  className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                >
                  <XCircle size={16} /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
