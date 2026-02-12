"use client";

import ServiceCard from "./_components/ServiceCard";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Page() {
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <ServiceCard title="AC Repair" image="/images/loginImage.jpg" />
        <ServiceCard title="Pipe installation" image="/images/loginImage.jpg" />
        <ServiceCard title="hello" image="/images/loginImage.jpg" />
        <ServiceCard title="hello" image="/images/loginImage.jpg" />
        <ServiceCard title="hello" image="/images/loginImage.jpg" />
      </div>
    </div>
  );
}
