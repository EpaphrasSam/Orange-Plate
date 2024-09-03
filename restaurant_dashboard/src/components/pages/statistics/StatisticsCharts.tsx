"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiShoppingCart, FiUsers, FiClock, FiDollarSign } from "react-icons/fi";

interface StatisticsChartsProps {
  data: {
    revenue: number[];
    orders: number[];
    customerSatisfaction: number[];
    topSellingItems: { name: string; value: number }[];
    deliveryStatus: { name: string; value: number }[];
  };
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ data }) => {
  const chartData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
    (day, index) => ({
      day,
      revenue: data.revenue[index],
      orders: data.orders[index],
      satisfaction: data.customerSatisfaction[index],
    })
  );

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-[#F9F9F9] p-4 rounded-lg shadow"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue (₵)</p>
              <h3 className="text-2xl font-bold">
                {data.revenue.reduce((a, b) => a + b, 0)}
              </h3>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <FiDollarSign className="text-[#FCAF01] text-xl" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-[#F9F9F9] p-4 rounded-lg shadow"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Orders</p>
              <h3 className="text-2xl font-bold">
                {data.orders.reduce((a, b) => a + b, 0)}
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <FiShoppingCart className="text-[#00FF00] text-xl" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-[#F9F9F9] p-4 rounded-lg shadow"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Satisfaction</p>
              <h3 className="text-2xl font-bold">
                {(
                  data.customerSatisfaction.reduce((a, b) => a + b, 0) / 7
                ).toFixed(1)}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FiUsers className="text-[#0088FE] text-xl" />
            </div>
          </div>
        </motion.div>
        <motion.div
          className="bg-[#F9F9F9] p-4 rounded-lg shadow"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Delivery Time</p>
              <h3 className="text-2xl font-bold">28 min</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <FiClock className="text-[#800080] text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="bg-[#F9F9F9] p-4 rounded-lg shadow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Weekly Statistics</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="bg-[#F9F9F9] p-4 rounded-lg shadow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-xl font-semibold mb-4">Top Selling Items</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.topSellingItems}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Product" fill="#FCAF01" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="bg-[#F9F9F9] p-4 rounded-lg shadow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">Delivery Status</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.deliveryStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.deliveryStatus.map((entry, index) => (
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
      </motion.div>
    </div>
  );
};

export default StatisticsCharts;
