"use client";

import { useState } from "react";

export default function BookingForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const service = {
    title: "Electrical: Install Bulb or Tube Light",
    image: "/bulb.jpg", // put your image path here
    description:
      "Need help installing a new bulb or tube light at home or office? Avoid electrical risks and let our experienced technicians handle it safely and professionally.",
    price: 550,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT SIDE */}
        <div>
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-100 object-cover rounded-2xl shadow-md"
          />

          <h1 className="text-3xl font-bold mt-6">{service.title}</h1>

          <p className="text-gray-600 mt-4 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit border">
          <h2 className="text-2xl font-semibold mb-4">Book a Service</h2>

          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">Price</span>
            <span className="text-xl font-bold">Rs. {service.price}</span>
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Time Slot */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Time</label>

            <select
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="">Choose time slot</option>
              <option value="4PM-5PM">4PM - 5PM</option>
              <option value="5PM-6PM">5PM - 6PM</option>
              <option value="6PM-7PM">6PM - 7PM</option>
              <option value="7PM-8PM">7PM - 8PM</option>
            </select>
          </div>

          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition">
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
