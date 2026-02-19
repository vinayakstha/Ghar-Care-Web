"use client";

import { useState, useEffect } from "react";
import ServiceCard from "@/app/user/services/_components/ServiceCard";
import { handleGetServicesByCategory } from "@/lib/actions/service-action";
import {
  handleAddFavourite,
  handleRemoveFavourite,
  handleGetFavouritesByUser,
} from "@/lib/actions/favourite-action";
import { useRouter, useParams } from "next/navigation";

interface Service {
  _id: string;
  serviceName: string;
  price: string;
  serviceImage: string;
}

interface Favourite {
  _id: string;
  serviceId: string | { _id: string };
}

export default function ServiceByCategory() {
  const [services, setServices] = useState<Service[]>([]);
  const [favourites, setFavourites] = useState<Favourite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const params = useParams();
  const categoryId = params.id as string; // Assert non-null

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    if (!categoryId) return; // safety check

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch services by category
        const serviceResult = await handleGetServicesByCategory(categoryId);

        // Fetch user's favourites
        const favouriteResult = await handleGetFavouritesByUser();

        if (serviceResult.success && serviceResult.data) {
          const servicesWithFullImage = serviceResult.data.map(
            (service: Service) => ({
              ...service,
              serviceImage: service.serviceImage
                ? `${IMAGE_BASE_URL}${service.serviceImage}`
                : "/images/service-placeholder.png",
            }),
          );
          setServices(servicesWithFullImage);
        }

        if (favouriteResult.success && favouriteResult.data) {
          setFavourites(favouriteResult.data);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const handleToggleFavourite = async (serviceId: string) => {
    const existingFavourite = favourites.find(
      (fav) =>
        fav.serviceId === serviceId ||
        (typeof fav.serviceId === "object" && fav.serviceId._id === serviceId),
    );

    if (existingFavourite) {
      setFavourites((prev) =>
        prev.filter((fav) => fav._id !== existingFavourite._id),
      );
      await handleRemoveFavourite(existingFavourite._id);
    } else {
      const result = await handleAddFavourite(serviceId);
      if (result.success) {
        setFavourites((prev) => [...prev, result.data]);
      }
    }
  };

  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center py-12">{error}</p>
      ) : (
        <>
          <h1 className="text-lg font-semibold text-gray-700 mb-6">
            Our Services
          </h1>

          {services.length === 0 ? (
            <p className="text-center text-gray-500">
              No services found in this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const isFavourited = favourites.some(
                  (fav) =>
                    fav.serviceId === service._id ||
                    (typeof fav.serviceId === "object" &&
                      fav.serviceId._id === service._id),
                );

                return (
                  <ServiceCard
                    key={service._id}
                    serviceName={service.serviceName}
                    servicePrice={` ${service.price}`}
                    serviceImage={service.serviceImage}
                    isFavourited={isFavourited}
                    onFavouriteClick={() => handleToggleFavourite(service._id)}
                    onBookNow={() =>
                      router.push(`/user/services/${service._id}`)
                    }
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
