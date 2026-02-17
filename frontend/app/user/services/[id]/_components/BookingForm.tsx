// "use client";

// import { useState } from "react";
// import { MapPin, Calendar, Clock } from "lucide-react";

// export default function BookingForm() {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [location, setLocation] = useState("");

//   const today = new Date().toISOString().split("T")[0];

//   const service = {
//     title: "Electrical: Install Bulb or Tube Light",
//     image: "/bulb.jpg",
//     description:
//       "Need help installing a new bulb or tube light at home or office? Avoid electrical risks and let our experienced technicians handle it safely and professionally.",
//     price: 550,
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!date || !time || !location) {
//       alert("Please fill all fields");
//       return;
//     }

//     const bookingData = {
//       service: service.title,
//       date,
//       time,
//       location,
//       price: service.price,
//     };

//     console.log("Booking Data:", bookingData);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-10">
//       <div className="grid md:grid-cols-2 gap-10">
//         {/* LEFT SIDE */}
//         <div>
//           <img
//             src={service.image}
//             alt={service.title}
//             className="w-full h-100 object-cover rounded-2xl shadow-md"
//           />

//           <h1 className="text-3xl font-bold mt-6">{service.title}</h1>

//           <p className="text-gray-600 mt-4 leading-relaxed">
//             {service.description}
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-lg rounded-2xl p-6 h-fit"
//         >
//           <h2 className="text-2xl font-semibold mb-4">Book a Service</h2>

//           <div className="flex justify-between items-center mb-6">
//             <span className="text-gray-500">Price</span>
//             <span className="text-xl font-bold">Rs. {service.price}</span>
//           </div>

//           {/* Location */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Service Location</label>
//             <div className="relative">
//               <MapPin
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="text"
//                 placeholder="Enter your address"
//                 className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Date */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Select Date</label>
//             <div className="relative">
//               <Calendar
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="date"
//                 min={today}
//                 className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Time */}
//           <div className="mb-6">
//             <label className="block mb-2 font-medium">Select Time</label>
//             <div className="relative">
//               <Clock
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <select
//                 className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none appearance-none"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//               >
//                 <option value="">Choose time slot</option>
//                 <option value="4PM-5PM">4PM - 5PM</option>
//                 <option value="5PM-6PM">5PM - 6PM</option>
//                 <option value="6PM-7PM">6PM - 7PM</option>
//                 <option value="7PM-8PM">7PM - 8PM</option>
//               </select>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#006BAA] hover:bg-[#01508d] text-white font-semibold py-3 rounded-xl transition"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { MapPin, Calendar, Clock } from "lucide-react";
import { handleGetService } from "@/lib/actions/service-action";

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

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;

      const result = await handleGetService(id);
      console.log(result);

      if (result.success && result.data) {
        setService(result.data);
      }

      setLoading(false);
    };

    fetchService();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !location || !service) {
      alert("Please fill all fields");
      return;
    }

    const bookingData = {
      serviceId: service._id,
      date,
      time,
      location,
      price: service.price,
    };

    console.log("Booking Data:", bookingData);
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
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 h-fit"
        >
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
                <option value="4PM-5PM">4PM - 5PM</option>
                <option value="5PM-6PM">5PM - 6PM</option>
                <option value="6PM-7PM">6PM - 7PM</option>
                <option value="7PM-8PM">7PM - 8PM</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#006BAA] hover:bg-[#01508d] text-white font-semibold py-3 rounded-xl transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
