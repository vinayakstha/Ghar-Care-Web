"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Clock } from "lucide-react";
import { toast } from "react-toastify";
import { handleGetService } from "@/lib/actions/service-action";
import { handleCreateBooking } from "@/lib/actions/booking-action";

interface Service {
  _id: string;
  serviceName: string;
  serviceImage: string;
  serviceDescription: string;
  price: string;
}

export default function BookingForm() {
  const params = useParams();
  const id = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  // Fetch service
  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;

      try {
        const result = await handleGetService(id);

        if (result.success && result.data) {
          setService(result.data);
        } else {
          toast.error(result.message || "Failed to load service");
        }
      } catch (error) {
        toast.error("Error fetching service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Handle Booking
  const handleSubmit = async () => {
    if (!date) return toast.error("Date is required");
    if (!time) return toast.error("Time is required");
    if (!location.trim()) return toast.error("Location is required");
    if (!service) return toast.error("Service not found");

    const bookingData = {
      serviceId: service._id,
      bookingDate: date,
      bookingTime: time,
      location,
      price: service.price,
    };

    try {
      setSubmitting(true);

      const result = await handleCreateBooking(bookingData);

      if (result.success) {
        toast.success("Service Booked Successfully");

        // Reset form
        setDate("");
        setTime("");
        setLocation("");
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20 text-lg font-medium text-red-500">
        Service not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <img
            src={`${IMAGE_BASE_URL}${service.serviceImage}`}
            alt={service.serviceName}
            className="w-full h-96 object-cover rounded-2xl shadow-md"
          />

          <h1 className="text-3xl font-bold mt-6">{service.serviceName}</h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {service.serviceDescription}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <form className="bg-white shadow-lg rounded-2xl p-6 h-fit">
          <h2 className="text-2xl font-semibold mb-4">Book Service</h2>

          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">Price</span>
            <span className="text-xl font-bold">Rs. {service.price}</span>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Service Location</label>
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Enter your address"
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Date</label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="date"
                min={today}
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          {/* Time */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Time</label>
            <div className="relative">
              <Clock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none appearance-none"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Choose time slot</option>
                <option value="9AM-10AM">9AM - 10AM</option>
                <option value="10AM-11AM">10AM - 11AM</option>
                <option value="11AM-12AM">11AM - 12PM</option>
                <option value="12PM-1PM">12PM - 1PM</option>
                <option value="1PM-2PM">1PM - 2PM</option>
                <option value="2PM-3PM">2PM - 3PM</option>
                <option value="3PM-4PM">3PM - 4PM</option>
                <option value="4PM-5PM">4PM - 5PM</option>
                <option value="5PM-6PM">5PM - 6PM</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-[#006BAA] hover:bg-[#01508d] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}
