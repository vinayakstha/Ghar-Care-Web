"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useRef } from "react";

interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
}

export default function CategoryAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ----------------------------
  // FETCH CATEGORIES
  // ----------------------------
  const fetchCategories = async () => {
    const res = await fetch("/api/admin/category");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ----------------------------
  // IMAGE PREVIEW
  // ----------------------------
  const handleImageChange = (file: File | null) => {
    setCategoryImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // ----------------------------
  // CLEAR FORM
  // ----------------------------
  const clearForm = () => {
    setCategoryName("");
    setCategoryImage(null);
    setImagePreview(null);
    setSelectedId(null);
  };

  // ----------------------------
  // CREATE / UPDATE
  // ----------------------------
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (categoryImage) {
      formData.append("categoryImage", categoryImage);
    }

    const url = selectedId
      ? `/api/admin/category/${selectedId}`
      : "/api/admin/category";

    const method = selectedId ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: formData,
    });

    fetchCategories();
    clearForm();
  };

  // ----------------------------
  // DELETE
  // ----------------------------
  const handleDelete = async (id: string) => {
    await fetch(`/api/admin/category/${id}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  // ----------------------------
  // EDIT
  // ----------------------------
  const handleEdit = (category: Category) => {
    setSelectedId(category._id);
    setCategoryName(category.categoryName);
    setImagePreview(category.categoryImage); // show existing image
    setCategoryImage(null); // only update if new file is chosen
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">
      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* IMAGE UPLOAD + PREVIEW */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category Image
          </label>

          <div className="flex items-center gap-4">
            <div className="relative w-28 h-28">
              {/* IMAGE PREVIEW */}
              <img
                src={imagePreview || "/placeholder.png"}
                alt="Category"
                className="w-full h-full object-cover rounded-md border"
              />

              {/* PENCIL OVERLAY */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-gray-800 text-white p-1.5 rounded-full shadow hover:bg-gray-700"
              >
                <Pencil size={14} />
              </button>

              {/* HIDDEN FILE INPUT */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        </div>

        {/* NAME */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Enter category name"
          />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-blue-600 text-white rounded"
        >
          {selectedId ? "Update" : "Create"}
        </button>

        <button
          onClick={clearForm}
          className="px-5 py-2 bg-gray-400 text-white rounded"
        >
          Clear
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={cat.categoryImage}
                    alt={cat.categoryName}
                    className="h-12 w-12 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-2 border">{cat.categoryName}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-gray-500">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
