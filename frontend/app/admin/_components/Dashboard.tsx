"use client";

import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, Layers, Wrench } from "lucide-react";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { handleGetCategories } from "@/lib/actions/admin/category-action";
import { handleGetServices } from "@/lib/actions/admin/service-action";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    users: 0,
    categories: 0,
    services: 0,
  });

  const [serviceByCategory, setServiceByCategory] = useState<
    { name: string; value: number }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);

      // Users
      const userResult = await handleGetAllUsers("1", "1");

      // Categories
      const categoryResult = await handleGetCategories();

      // Services
      const serviceResult = await handleGetServices();

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

      // Prepare pie chart data (group services by category)
      if (
        serviceResult.success &&
        serviceResult.data &&
        categoryResult.success &&
        categoryResult.data
      ) {
        const categories = categoryResult.data;
        const services = serviceResult.data;

        const pieData = categories.map((cat: any) => {
          const count = services.filter(
            (s: any) => s.categoryId === cat._id,
          ).length;
          return { name: cat.categoryName, value: count };
        });

        setServiceByCategory(pieData);
      }

      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

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

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Services by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={serviceByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {serviceByCategory.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
