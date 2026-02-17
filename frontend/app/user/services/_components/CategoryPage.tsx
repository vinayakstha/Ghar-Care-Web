"use client";

import { useState, useEffect } from "react";
import CategoryCard from "../_components/CategoryCard";
import ServiceCard from "./ServiceCard";
import { handleGetCategories } from "@/lib/actions/category-action";
import { handleGetServices } from "@/lib/actions/service-action";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
}

interface Service {
  _id: string;
  serviceName: string;
  price: string;
  serviceImage: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoryResult, serviceResult] = await Promise.all([
          handleGetCategories(),
          handleGetServices(),
        ]);

        // Categories
        if (categoryResult.success && categoryResult.data) {
          const categoriesWithFullImage = categoryResult.data.map(
            (cat: Category) => ({
              ...cat,
              categoryImage: cat.categoryImage
                ? `${IMAGE_BASE_URL}${cat.categoryImage}`
                : "/images/category-placeholder.png",
            }),
          );

          setCategories(categoriesWithFullImage);
        }

        // Services
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
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {/* CATEGORY SECTION */}
      <h1 className="text-lg font-semibold text-gray-700 mb-6">Categories</h1>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center py-12">{error}</p>
      ) : (
        <>
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-0 mb-10">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                name={category.categoryName}
                image={category.categoryImage}
                onClick={() => console.log(`${category.categoryName} clicked`)}
              />
            ))}
          </div>

          {/* Services Grid */}
          <h1 className="text-lg font-semibold text-gray-700 mb-6">
            Our Services
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                serviceName={service.serviceName}
                servicePrice={` ${service.price}`}
                serviceImage={service.serviceImage}
                onBookNow={() => router.push(`/user/services/${service._id}`)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
