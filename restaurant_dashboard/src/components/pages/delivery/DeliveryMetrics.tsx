"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@nextui-org/react";
import { FiTruck, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const DeliveryMetrics = ({ metrics }: { metrics: any }) => {
  const metricItems = [
    {
      key: "activeDeliveries",
      title: "Active Deliveries",
      icon: FiTruck,
      color: "text-blue-500",
    },
    {
      key: "avgDeliveryTime",
      title: "Avg. Delivery Time",
      icon: FiClock,
      color: "text-green-500",
    },
    {
      key: "completedDeliveries",
      title: "Completed Today",
      icon: FiCheckCircle,
      color: "text-purple-500",
    },
    {
      key: "delayedDeliveries",
      title: "Delayed Deliveries",
      icon: FiAlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {metricItems.map((item) => (
        <Card key={item.key} className="shadow-sm bg-[#F9F9F9]">
          <CardBody className="flex flex-row items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{item.title}</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics[item.key]}
              </p>
            </div>
            <div className={`p-3 rounded-full ${item.color} bg-opacity-20`}>
              <item.icon className={`text-2xl ${item.color}`} />
            </div>
          </CardBody>
        </Card>
      ))}
    </motion.div>
  );
};

export default DeliveryMetrics;
