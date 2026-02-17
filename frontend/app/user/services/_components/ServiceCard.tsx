"use client";

interface ServiceCardProps {
  serviceName: string;
  servicePrice: string;
  serviceImage: string;
  onBookNow?: () => void;
}

export default function ServiceCard({
  serviceName,
  servicePrice,
  serviceImage,
  onBookNow,
}: ServiceCardProps) {
  return (
    <div
      className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      style={{
        backgroundImage: `url(${serviceImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 flex flex-col justify-end p-4"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
        }}
      >
        <div>
          <h3 className="text-white text-lg font-semibold">{serviceName}</h3>
          <p className="text-white text-sm mb-3">Rs.{servicePrice}</p>
        </div>

        <button
          onClick={onBookNow}
          className="bg-[#006BAA] text-white font-semibold px-4 py-2 rounded hover:bg-[#01508d] transition-colors"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
