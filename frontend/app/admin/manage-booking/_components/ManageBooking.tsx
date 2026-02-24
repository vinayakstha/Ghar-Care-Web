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
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl p-8 w-[500px] max-w-[95vw] space-y-6 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-800">
              {selectedBooking.serviceId.serviceName}
            </h2>

            {/* Image */}
            <img
              src={`${IMAGE_BASE_URL}${selectedBooking.serviceId.serviceImage}`}
              alt={selectedBooking.serviceId.serviceName}
              className="w-full h-48 object-cover rounded-xl"
            />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <span>{selectedBooking.userId.username}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-400" />
                <span>{selectedBooking.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-400" />
                <span>{selectedBooking.bookingDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>{selectedBooking.bookingTime}</span>
              </div>

              <div>
                <span className="text-gray-500">Price</span>
                <p className="font-medium text-gray-800">
                  Rs {selectedBooking.price}
                </p>
              </div>

              <div>
                <span className="text-gray-500">Status</span>
                <br />
                <p
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                    selectedBooking.status === "pending"
                      ? "bg-blue-600"
                      : selectedBooking.status === "completed"
                        ? "bg-green-600"
                        : "bg-red-600"
                  }`}
                >
                  {selectedBooking.status.toUpperCase()}
                </p>
              </div>
            </div>

            {/* Status Buttons */}
            {selectedBooking.status === "pending" && (
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() =>
                    handleStatusChange(selectedBooking._id, "completed")
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <CheckCircle size={16} /> Mark Completed
                </button>

                <button
                  onClick={() =>
                    handleStatusChange(selectedBooking._id, "cancelled")
                  }
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <XCircle size={16} /> Cancel Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
