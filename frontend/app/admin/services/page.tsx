"use client";

import { useEffect, useState } from "react";
import ServiceCard from "./_components/ServiceCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleGetServices } from "@/lib/actions/admin/service-action";

interface Service {
  _id: string;
  serviceName: string;
  serviceImage: string;
}

export default function Page() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const result = await handleGetServices();
      if (result.success && result.data) {
        setServices(result.data);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6">
      {/* Create Service Link */}
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/services/create"
          className="flex items-center gap-2 px-4 py-2 bg-[#07ac1d] hover:bg-[#06c720] text-white rounded-lg transition"
        >
          <Plus size={20} />
          Create Service
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            console.log("SERVICE IMAGE:", service.serviceImage);

            return (
              <ServiceCard
                key={service._id}
                title={service.serviceName}
                image={`http://localhost:5050${service.serviceImage}`}
                onEdit={() => console.log("Edit", service._id)}
                onDelete={() => console.log("Delete", service._id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
