import {
  Plug,
  PanelTop,
  Lightbulb,
  Shield,
  Gauge,
  SlidersHorizontal,
} from "lucide-react";

const services = [
  {
    title: "Electrical installation",
    icon: Plug,
  },
  {
    title: "Panel Upgrades",
    icon: PanelTop,
  },
  {
    title: "Lighting Upgrades",
    icon: Lightbulb,
  },
  {
    title: "Surge Protection",
    icon: Shield,
  },
  {
    title: "Electrical safety assessments",
    icon: Gauge,
  },
  {
    title: "Switchboard upgrades",
    icon: SlidersHorizontal,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#006BAA] font-semibold text-sm tracking-wider uppercase">
            What we offer
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-800">
            Serving you 24 hours a day, 365 days a year.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              Icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* SERVICE CARD */
function ServiceCard({ title, Icon }: { title: string; Icon: any }) {
  return (
    <div className="group bg-white rounded-lg shadow-md p-8 text-center relative overflow-hidden">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <Icon className="h-10 w-10 text-[#006BAA]" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[#006BAA] mb-3">{title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
      </p>

      {/* Bottom Accent Line */}
      <span className="absolute bottom-0 left-0 h-1 w-full bg-[#006BAA] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
}
