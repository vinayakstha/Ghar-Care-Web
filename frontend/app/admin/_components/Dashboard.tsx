"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Users, Layers, Wrench } from "lucide-react";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { handleGetCategories } from "@/lib/actions/admin/category-action";
import { handleGetServices } from "@/lib/actions/admin/service-action";

// Types
type ChartItem = {
  name: string;
  value: number;
};

type Metrics = {
  users: number;
  categories: number;
  services: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    users: 0,
    categories: 0,
    services: 0,
  });

  const [serviceByCategory, setServiceByCategory] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      try {
        // Fetch users, categories, services
        const [userResult, categoryResult, serviceResult] = await Promise.all([
          handleGetAllUsers("1", "1"),
          handleGetCategories(),
          handleGetServices(),
        ]);

        // Set metrics
        setMetrics({
          users:
            userResult.success && userResult.pagination
              ? userResult.pagination.totalItems
              : 0,
          categories:
            categoryResult.success && categoryResult.data
              ? categoryResult.data.length
              : 0,
          services:
            serviceResult.success && serviceResult.data
              ? serviceResult.data.length
              : 0,
        });

        // Prepare bar chart data
        if (
          categoryResult.success &&
          categoryResult.data &&
          serviceResult.success &&
          serviceResult.data
        ) {
          const categories = categoryResult.data;
          const services = serviceResult.data;

          const chartData: ChartItem[] = categories.map((cat: any) => {
            const count = services.filter(
              (s: any) => s.categoryId?._id === cat._id, // 🔑 FIX: use s.categoryId._id
            ).length;

            return {
              name: cat.categoryName || "Unknown",
              value: count,
            };
          });

          console.log("Bar Chart Data:", chartData); // Debug
          setServiceByCategory(chartData);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const BAR_COLOR = "#006BAA";

  return (
    <div className="p-6 bg-white min-h-screen space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? "..." : metrics.users}
            </h2>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="text-blue-600" size={22} />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Categories</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? "..." : metrics.categories}
            </h2>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <Layers className="text-green-600" size={22} />
          </div>
        </div>

        {/* Services */}
        <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Services</p>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {loading ? "..." : metrics.services}
            </h2>
          </div>
          <div className="bg-purple-100 p-3 rounded-full">
            <Wrench className="text-purple-600" size={22} />
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-2xl shadow h-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Services by Category
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={serviceByCategory}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={BAR_COLOR} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
