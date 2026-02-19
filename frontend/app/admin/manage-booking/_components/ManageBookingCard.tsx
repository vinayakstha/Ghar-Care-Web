"use client";

import React, { JSX } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  Hourglass,
  Eye,
} from "lucide-react";

interface ManageBookingCardProps {
  serviceImage: string;
  serviceName: string;
  price: number;
  bookingDate: string;
  bookingTime: string;
  location: string;
  status: "pending" | "cancelled" | "completed";
  onView?: () => void;
}

export default function ManageBookingCard({
  serviceImage,
  serviceName,
  price,
  bookingDate,
  bookingTime,
  location,
  status,
  onView,
}: ManageBookingCardProps) {
  const statusInfo: Record<
    "pending" | "cancelled" | "completed",
    { color: string; icon: JSX.Element }
  > = {
    pending: { color: "#006BAA", icon: <Hourglass size={16} /> },
    cancelled: { color: "#FF0000", icon: <XCircle size={16} /> },
    completed: { color: "#00AA00", icon: <CheckCircle size={16} /> },
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 w-full gap-4">
      {/* Left: Image */}
      <div className="shrink-0 w-28 h-28 rounded-lg overflow-hidden">
        <img
          src={serviceImage}
          alt={serviceName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Middle: Booking Details */}
      <div className="flex-1 flex flex-col justify-between gap-1">
        <h2 className="text-lg font-semibold">{serviceName}</h2>
        <p className="text-gray-600 font-medium">Rs. {price.toFixed(2)}</p>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar size={16} />
          <span>{bookingDate}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Clock size={16} />
          <span>{bookingTime}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
      </div>

      {/* Right: Status + View Button */}
      <div className="shrink-0 flex flex-col items-end gap-3">
        <span
          className="px-3 py-1 rounded-full text-white font-semibold text-sm flex items-center gap-1"
          style={{ backgroundColor: statusInfo[status].color }}
        >
          {statusInfo[status].icon}
          {status.toUpperCase()}
        </span>

        <button
          onClick={onView}
          className="flex items-center gap-1 text-sm font-medium text-[#006BAA] hover:underline"
        >
          <Eye size={16} />
          View
        </button>
      </div>
    </div>
  );
}
