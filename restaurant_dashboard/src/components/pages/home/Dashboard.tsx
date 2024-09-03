"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  FiTrendingUp,
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";

const iconMap = {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiUsers,
};

interface DashboardProps {
  data: {
    summary: Array<{ title: string; value: string; icon: string }>;
    recentOrders: Array<{
      id: string;
      customer: string;
      items: string;
      total: string;
      status: string;
    }>;
    topPurchased: Array<{ name: string; value: number }>;
    salesData: Array<{ time: string; sales: number }>;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Summary Cards */}
      {data.summary.map((item, index) => {
        const IconComponent = iconMap[item.icon as keyof typeof iconMap];
        let iconColor = "#FCAF01";
        let bgColor = "#FFF5E6";

        switch (item.title) {
          case "Total Income (₵)":
            iconColor = "#4CAF50";
            bgColor = "#E8F5E9";
            break;
          case "Total Orders":
            iconColor = "#2196F3";
            bgColor = "#E3F2FD";
            break;
          case "Daily Sales":
            iconColor = "#FF5722";
            bgColor = "#FBE9E7";
            break;
          case "Average Satisfaction":
            iconColor = "#9C27B0";
            bgColor = "#F3E5F5";
            break;
        }

        return (
          <motion.div key={item.title} variants={itemVariants}>
            <Card className="shadow-sm bg-[#F9F9F9]">
              <CardBody className="flex flex-col items-start p-6">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{item.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                  <div
                    style={{ backgroundColor: bgColor }}
                    className="p-3 rounded-full"
                  >
                    <IconComponent
                      style={{ color: iconColor }}
                      className="text-xl"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        );
      })}

      <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Sales Chart */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm bg-[#F9F9F9]">
            <CardBody>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Daily Sales
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={data.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#FCAF01"
                    fill="#FCAF01"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </motion.div>

        {/* Top Purchased */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm bg-[#F9F9F9]">
            <CardBody>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Top Selling Items
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.topPurchased}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#FCAF01" />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 lg:col-span-4"
      >
        <Card className="shadow-sm bg-[#F9F9F9]">
          <CardBody>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Recent Orders
            </h3>
            <Table aria-label="Recent orders table" className="text-sm">
              <TableHeader>
                <TableColumn>CUSTOMER</TableColumn>
                <TableColumn>ITEMS</TableColumn>
                <TableColumn>TOTAL</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {data.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
