"use client";

import { useEffect, useState } from "react";
import { MapPin, Pencil } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser } from "@/lib/api/auth"; // your API function
import Image from "next/image";

export default function ProfilePage() {
  const { user, setUser, loading, checkAuth } = useAuth();
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setProfileLoading(true);
        // Try getting the current user from API
        const data = await getCurrentUser();
        setUser(data); // update context
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    // Only fetch if no user is in context
    if (!user) fetchUser();
  }, [user, setUser]);

  if (loading || profileLoading) return <p>Loading profile...</p>;
  const profilePicUrl = user?.profilePicture
    ? user.profilePicture.startsWith("http")
      ? user.profilePicture
      : `http://localhost:5050${user.profilePicture}`
    : "/default-profile.png";

  return (
    <div className="w-full p-4 md:p-6 space-y-6  min-h-screen">
      {/* PAGE TITLE */}
      <h1 className="text-lg font-semibold text-gray-700">My Profile</h1>

      {/* PROFILE HEADER */}
      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden">
          <Image
            src={profilePicUrl}
            alt="Profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user?.role}</p>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            {user?.location && (
              <>
                <MapPin size={14} />
                <span>{user.location}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* PERSONAL INFORMATION */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b">
          <h3 className="font-semibold text-gray-700">Personal Information</h3>
          <button className="flex items-center gap-1 text-sm bg-[#006BAA] text-white px-3 py-1.5 rounded-md hover:bg-[#01508d]">
            <Pencil size={14} />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 px-4 md:px-6 py-6">
          <InfoItem label="First Name" value={user?.firstName || "-"} />
          <InfoItem label="Last Name" value={user?.lastName || "-"} />
          <InfoItem label="Username" value={user?.username || "-"} />
          <InfoItem label="Email Address" value={user?.email || "-"} />
          <InfoItem label="Phone Number" value={user?.phoneNumber || "-"} />
          <InfoItem label="User Role" value={user?.role || "-"} />
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
