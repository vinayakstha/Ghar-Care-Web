import BookingCard from "./BookingCard";

export default function MyBooking() {
  // Example booking data
  const bookings = [
    {
      serviceImage: "/images/abt.jpg", // or your uploaded image URL
      serviceName: "Modern Minimalist Urban Apartment",
      price: 120,
      bookingDate: "Feb 15, 2026",
      bookingTime: "10:00 AM",
      location: "Kathmandu, Nepal",
      status: "completed",
    },
    {
      serviceImage: "/images/abt.jpg",
      serviceName: "Relaxing Spa Package",
      price: 80,
      bookingDate: "Feb 20, 2026",
      bookingTime: "2:00 PM",
      location: "Pokhara, Nepal",
      status: "pending",
    },
  ];

  return (
    <div className="w-full p-4 md:p-6 space-y-6  min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-lg font-semibold text-gray-700">My Bookings</h1>

      <div className="pb-6 space-y-4 min-h-screen">
        {bookings.map((booking, index) => (
          <BookingCard
            key={index}
            serviceImage={booking.serviceImage}
            serviceName={booking.serviceName}
            price={booking.price}
            bookingDate={booking.bookingDate}
            bookingTime={booking.bookingTime}
            location={booking.location}
            status={booking.status as "pending" | "cancelled" | "completed"}
          />
        ))}
      </div>
    </div>
  );
}
