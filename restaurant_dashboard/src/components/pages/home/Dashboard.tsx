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
  Image,
} from "@nextui-org/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

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
    topPurchased: Array<{ name: string; quantity: number; image: string }>;
    salesData: Array<{ time: string; sales: number }>;
  };
}

const iconMap: { [key: string]: React.ElementType } = {
  FaMoneyBillWave,
  FaShoppingCart,
  FaChartLine,
  FaWallet,
};

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Summary Cards */}
      {data.summary.map((item, index) => {
        const IconComponent = iconMap[item.icon];
        return (
          <Card key={item.title} className="shadow-sm bg-gray-100">
            <CardBody className="flex flex-col items-start p-6">
              <p className="text-sm text-gray-600 mb-1">{item.title}</p>
              <div className="flex items-center w-full">
                <IconComponent className="text-3xl text-[#FCAF01] mr-3" />
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </CardBody>
          </Card>
        );
      })}

      {/* Daily Sales Chart */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-sm bg-gray-100">
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

      {/* Top Purchased */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-1 shadow-sm bg-gray-100">
        <CardBody>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Top Purchased
          </h3>
          <div className="flex flex-col gap-4">
            {data.topPurchased.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-full mr-3"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm text-gray-600">
                  {item.quantity} <span className="text-[10px]">sold</span>
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Recent Orders */}
      <Card className="col-span-1 md:col-span-2 lg:col-span-4 shadow-sm bg-gray-100">
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
    </div>
  );
};

export default Dashboard;
