"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  handleCreateCategory,
  handleGetCategories,
  handleUpdateCategory,
  handleDeleteCategory,
} from "@/lib/actions/admin/category-action";

interface Category {
  _id: string;
  categoryName: string;
  categoryImage: string;
}

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const IMAGE_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050";

  // IMAGE PREVIEW
  const handleImageChange = (file: File | null) => {
    setCategoryImage(file);
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  // CLEAR FORM
  const clearForm = () => {
    setCategoryName("");
    setCategoryImage(null);
    setImagePreview(null);
    setEditingCategoryId(null);
  };

  // FETCH CATEGORIES
  const fetchCategories = async () => {
    const res = await handleGetCategories();
    if (res.success) setCategories(res.data);
    else alert(res.message);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // CREATE / UPDATE
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    if (categoryImage) formData.append("categoryImage", categoryImage);

    try {
      const res = editingCategoryId
        ? await handleUpdateCategory(editingCategoryId, formData)
        : await handleCreateCategory(formData);

      if (res.success) {
        toast.success(res.message);
        clearForm();
        fetchCategories();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed");
    }
  };

  // EDIT
  const handleEdit = (cat: Category) => {
    setEditingCategoryId(cat._id);
    setCategoryName(cat.categoryName);
    // setImagePreview(cat.categoryImage);
    setImagePreview(`${IMAGE_BASE_URL}${cat.categoryImage}`);
    setCategoryImage(null);
  };

  // DELETE
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await handleDeleteCategory(id);
      if (res.success) {
        toast.success(res.message);
        if (editingCategoryId === id) clearForm();
        fetchCategories();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.success(error.message || "Failed to delete category");
    }
  };

  return (
    <div className=" p-4 md:p-6 space-y-6  min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-lg font-semibold text-gray-700">Category</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Image</label>
            <div className="relative w-28 h-28">
              <Image
                src={imagePreview || "/images/category-placeholder.png"}
                alt="Category"
                fill
                className="object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 bg-[#006BAA] text-white p-1.5 rounded-full"
              >
                <Pencil size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
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
            className="px-4 py-1.5 bg-[#07ac1d] hover:bg-[#06c720] text-white rounded transition flex items-center gap-1"
          >
            {editingCategoryId ? <Pencil size={15} /> : <Plus size={15} />}
            <span>{editingCategoryId ? "Update" : "Create"}</span>
          </button>
          <button
            onClick={clearForm}
            className="px-4 py-1.5 bg-[#323131] hover:bg-[#4b4a4a] text-white rounded transition"
          >
            Clear
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <tr
                    key={cat._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* NAME */}
                    <td className="px-6 py-4 text-gray-600">
                      {cat.categoryName}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg
                             bg-yellow-50 text-yellow-600 hover:bg-yellow-100
                             transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg
                             bg-red-50 text-red-600 hover:bg-red-100
                             transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
