"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

const OrderQueue = ({ orders }: { orders: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-[#F9F9F9] shadow-sm">
        <CardHeader className="font-bold text-lg">
          Orders Ready for Pickup
        </CardHeader>
        <CardBody>
          {orders.map((order: any) => (
            <motion.div
              key={order.id}
              className="flex justify-between items-center mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.customerName}</p>
                <p className="text-sm text-gray-500">
                  Ready since: {order.readyTime}
                </p>
              </div>
              <Button color="primary" size="sm">
                View Details
              </Button>
            </motion.div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default OrderQueue;
