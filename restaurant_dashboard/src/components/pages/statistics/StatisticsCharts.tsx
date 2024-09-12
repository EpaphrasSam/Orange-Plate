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
import {
  FiShoppingCart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";
import { FaCediSign } from "react-icons/fa6";
interface StatisticsChartsProps {
  data: {
    summary: Array<{ title: string; value: string | number; icon: string }>;
    charts: {
      revenueByDay: Array<{ day: string; value: number }>;
      ordersByDay: Array<{ day: string; value: number }>;
      topSellingItems: Array<{ name: string; value: number }>;
      orderStatusDistribution: Array<{ name: string; value: number }>;
      averagePreparationTime: Array<{ status: string; time: number }>;
    };
  };
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF0000",
  "#00FF00",
  "#0000FF",
];

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({ data }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.summary.map((item, index) => (
          <motion.div
            key={item.title}
            className="bg-[#F9F9F9] p-4 rounded-lg shadow"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{item.title}</p>
                <h3 className="text-2xl font-bold">{item.value}</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                {item.icon === "FaCediSign" && (
                  <FaCediSign className="text-[#FCAF01] text-xl" />
                )}
                {item.icon === "FiShoppingCart" && (
                  <FiShoppingCart className="text-[#00FF00] text-xl" />
                )}
                {item.icon === "FiTrendingUp" && (
                  <FiTrendingUp className="text-[#0088FE] text-xl" />
                )}
                {item.icon === "FiUsers" && (
                  <FiUsers className="text-[#800080] text-xl" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="bg-[#F9F9F9] p-4 rounded-lg shadow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Revenue and Orders by Day
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data.charts.revenueByDay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="value"
              name="Revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              data={data.charts.ordersByDay}
              dataKey="value"
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
          <BarChart data={data.charts.topSellingItems}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Quantity Sold" fill="#FCAF01" />
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
        <h2 className="text-xl font-semibold mb-4">
          Order Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data.charts.orderStatusDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.charts.orderStatusDistribution.map((entry, index) => (
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

      <motion.div
        className="bg-[#F9F9F9] p-4 rounded-lg shadow"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4">
          Average Preparation Time by Status
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.charts.averagePreparationTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="time" name="Average Time (minutes)" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default StatisticsCharts;
