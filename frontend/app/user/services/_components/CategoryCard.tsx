"use client";

interface CategoryCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

export default function CategoryCard({
  name,
  image,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-48 rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer bg-white overflow-hidden"
    >
      <img src={image} alt={name} className="w-full h-32 object-cover" />

      <div className="p-3 text-center">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      </div>
    </div>
  );
}
