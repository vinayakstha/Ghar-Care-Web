"use client";

import { useState, useEffect } from "react";
import CategoryCard from "../_components/CategoryCard";
import { handleGetCategories } from "@/lib/actions/category-action";

interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_IMAGE_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const result = await handleGetCategories();

        if (result.success && result.data) {
          const categoriesWithFullImage = result.data.map((cat: Category) => ({
            ...cat,
            categoryImage: cat.categoryImage
              ? `${IMAGE_BASE_URL}${cat.categoryImage}`
              : "/images/category-placeholder.png",
          }));

          setCategories(categoriesWithFullImage);
        } else {
          setError(result.message || "Failed to fetch categories");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full p-4 md:p-6 min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-lg font-semibold text-gray-700">Choose a category</h1>

      {/* CATEGORY SECTION */}
      <div className="bg-white p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center py-12">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  name={category.categoryName}
                  image={category.categoryImage}
                  onClick={() =>
                    console.log(`${category.categoryName} clicked`)
                  }
                />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No categories found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
