"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";

const ActiveDeliveries = ({ deliveries }: { deliveries: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-[#F9F9F9] shadow-sm">
        <CardHeader className="font-bold text-lg">Active Deliveries</CardHeader>
        <CardBody>
          {deliveries.map((delivery: any) => (
            <motion.div
              key={delivery.id}
              className="flex justify-between items-center mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <div>
                <p className="font-semibold">Order #{delivery.orderId}</p>
                <p className="text-sm text-gray-500">
                  Driver: {delivery.driverName}
                </p>
                <p className="text-sm text-gray-500">ETA: {delivery.eta}</p>
              </div>
              <Button color="secondary" size="sm">
                Track
              </Button>
            </motion.div>
          ))}
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ActiveDeliveries;
