// export default function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p>Welcome to the admin dashboard!</p>
//     </div>
//   );
// }
"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  // Dummy data for metrics
  const metrics = {
    users: 1200,
    categories: 5,
    services: 50,
  };

  // Dummy data for line chart
  const chartData = [
    { name: "Jan", Users: 400, Services: 240 },
    { name: "Feb", Users: 300, Services: 139 },
    { name: "Mar", Users: 500, Services: 500 },
    { name: "Apr", Users: 700, Services: 300 },
    { name: "May", Users: 600, Services: 450 },
  ];

  // Dummy data for pie chart
  const serviceByCategory = [
    { name: "Cleaning", value: 15 },
    { name: "Plumbing", value: 10 },
    { name: "Electrical", value: 8 },
    { name: "Painting", value: 7 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl font-bold">{metrics.users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Categories</h2>
          <p className="text-2xl font-bold">{metrics.categories}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">Services</h2>
          <p className="text-2xl font-bold">{metrics.services}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Services by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={serviceByCategory}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
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
