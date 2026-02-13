"use client";

import { Pencil, Trash2 } from "lucide-react";

interface ServiceCardProps {
  title: string;
  image: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ServiceCard({
  title,
  image,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition duration-300" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <h2 className="text-xl font-semibold text-white drop-shadow-md">
          {title}
        </h2>

        <div className="flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 rounded-xl bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 hover:bg-white transition"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex items-center gap-1 rounded-xl bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
