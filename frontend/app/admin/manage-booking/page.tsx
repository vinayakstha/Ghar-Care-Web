import ManageBookingCard from "./_components/ManageBookingCard";

export default function Page() {
  return (
    <div>
      <ManageBookingCard
        serviceImage="/service.jpg"
        serviceName="AC Repair Service"
        price={2500}
        bookingDate="2026-02-20"
        bookingTime="10:00 AM"
        location="Kathmandu"
        status="pending"
      />
    </div>
  );
}
