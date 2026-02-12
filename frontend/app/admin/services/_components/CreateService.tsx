// "use client";

// import { useRef, useState } from "react";
// import { Upload } from "lucide-react";
// import Image from "next/image";

// export default function CreateServiceForm() {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const handleImageClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="p-8 bg-white min-h-screen">
//       <h2 className="text-lg font-semibold text-gray-700">Create Service</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* LEFT SIDE - Image */}
//         <div className="lg:col-span-1">
//           <label className="block text-sm font-medium mb-2">
//             Service Image
//           </label>

//           <div
//             onClick={handleImageClick}
//             className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500 transition bg-white overflow-hidden"
//           >
//             {preview ? (
//               <Image
//                 src={preview}
//                 alt="Preview"
//                 width={400}
//                 height={400}
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="text-center text-gray-500">
//                 <Upload className="w-10 h-10 mx-auto mb-2" />
//                 <p className="text-sm">Click to upload image</p>
//               </div>
//             )}
//           </div>

//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleImageChange}
//             className="hidden"
//             accept="image/*"
//           />
//         </div>

//         {/* RIGHT SIDE - Form Fields */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Service Name */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Service Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter service name"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               />
//             </div>

//             {/* Price */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Price</label>
//               <input
//                 type="number"
//                 placeholder="Enter price"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//               />
//             </div>
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <select className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
//               <option>Select Category</option>
//               <option>Cleaning</option>
//               <option>Plumbing</option>
//               <option>Electrical</option>
//             </select>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description
//             </label>
//             <textarea
//               rows={4}
//               placeholder="Enter service description"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             />
//           </div>

//           {/* Submit */}
//           <div className="flex justify-end">
//             <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
//               Create Service
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleGetCategories } from "@/lib/actions/admin/category-action"; // server action
import { handleCreateCategory } from "@/lib/actions/admin/category-action"; // if needed later

interface Category {
  _id: string;
  categoryName: string;
}

export default function CreateServiceForm() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // ✅ Fetch categories using server action
  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await handleGetCategories(); // call server action
        if (result.success && result.data) {
          setCategories(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="p-8 bg-white min-h-screen">
      <h2 className="text-lg font-semibold text-gray-700">Create Service</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SIDE - Image */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium mb-2">
            Service Image
          </label>

          <div
            onClick={handleImageClick}
            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500 transition bg-white overflow-hidden"
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="text-center text-gray-500">
                <Upload className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm">Click to upload image</p>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* RIGHT SIDE - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Service Name
              </label>
              <input
                type="text"
                placeholder="Enter service name"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            {loading ? (
              <p>Loading categories...</p>
            ) : (
              <select className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Enter service description"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Create Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
