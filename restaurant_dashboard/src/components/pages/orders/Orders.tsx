"use client";

import React, { useState, useEffect } from "react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { Button, Card, Divider } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { Order, OrderStatus } from "@/types/orderType";
import { updateOrderStatus } from "@/services/orderService";
import { toast } from "react-hot-toast";
import CustomSpinner from "@/components/ui/CustomSpinner";

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders[0] || null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending.toLowerCase():
        return "bg-[#FFFACD] text-black";
      case OrderStatus.Processing.toLowerCase():
        return "bg-[#FFA07A] text-black";
      case OrderStatus.Ready.toLowerCase():
        return "bg-[#90EE90] text-black";
      case OrderStatus.LookingForRider.toLowerCase():
        return "bg-[#87CEFA] text-black";
      case OrderStatus.RiderAssigned.toLowerCase():
        return "bg-[#E6E6FA] text-black";
      case OrderStatus.OnTheWay.toLowerCase():
        return "bg-[#FFA500] text-black";
      case OrderStatus.Delivered.toLowerCase():
        return "bg-[#98FB98] text-black";
      default:
        return "bg-[#D3D3D3] text-black";
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string) => {
    try {
      setIsLoading(true);
      await updateOrderStatus(orderId);
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Error updating order status");
      console.error("Error updating order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderActionButton = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending.toLowerCase():
        return (
          <Button
            color="primary"
            className="max-w-[200px] w-full"
            onClick={() => handleUpdateOrderStatus(selectedOrder?.id || "")}
            isLoading={isLoading}
            spinner={<CustomSpinner />}
          >
            Process
          </Button>
        );
      case OrderStatus.Processing.toLowerCase():
        return (
          <Button
            color="success"
            className="max-w-[200px] w-full"
            onClick={() => handleUpdateOrderStatus(selectedOrder?.id || "")}
            isLoading={isLoading}
            spinner={<CustomSpinner />}
          >
            Ready
          </Button>
        );
      case OrderStatus.Ready.toLowerCase():
        return (
          <Button
            color="warning"
            className="max-w-[200px] w-full"
            onClick={() => handleUpdateOrderStatus(selectedOrder?.id || "")}
            isLoading={isLoading}
            spinner={<CustomSpinner />}
          >
            Look for Rider
          </Button>
        );
      case OrderStatus.RiderAssigned.toLowerCase():
        return (
          <Button
            color="warning"
            className="max-w-[200px] w-full"
            onClick={() => handleUpdateOrderStatus(selectedOrder?.id || "")}
            isLoading={isLoading}
            spinner={<CustomSpinner />}
          >
            Start Delivery
          </Button>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (orders.length === 0) {
      setSelectedOrder(null);
    }
  }, [orders]);

  const renderOrderDetails = () => (
    <motion.div
      key={selectedOrder?.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="flex flex-col h-full p-4 bg-[#F9F9F9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOrder?.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b">
              <div className="flex justify-between items-start">
                <div className="flex flex-col mb-2">
                  <p className="text-xs font-bold text-gray-500">Order ID</p>
                  <p className="text-gray-700 text-sm font-bold line-clamp-1 break-all">
                    #{selectedOrder?.id}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm line-clamp-1">
                    {new Date(
                      selectedOrder?.orderTime || ""
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm line-clamp-1">
                    {new Date(
                      selectedOrder?.orderTime || ""
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p
                className={`${getStatusColor(
                  (selectedOrder?.status?.toLowerCase() as OrderStatus) ||
                    OrderStatus.Pending
                )} inline-block px-4 py-1 rounded-full mt-2 capitalize`}
              >
                {selectedOrder?.status}
              </p>
            </div>
            <div className="flex-grow overflow-y-auto p-4">
              {selectedOrder?.CartItem.map((item) => (
                <div key={item.id} className="flex mb-4">
                  <div className="w-16 flex-shrink-0 mr-4">
                    <Image
                      src="/burger.jpg"
                      alt={item.MenuItem.name}
                      width={100}
                      height={100}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-800 font-bold">
                          {item.MenuItem.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {item.MenuItem.option}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          ₵ {item.MenuItem.price.toFixed(2)}
                          <span className="text-xs font-bold ml-1">
                            x {item.quantity}
                          </span>
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        ₵ {(item.MenuItem.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Divider className="my-4" />
            <div className="p-4 mt-auto">
              <div className="flex justify-between mb-2">
                <span>Item(s)</span>
                <span>₵ {selectedOrder?.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery</span>
                <span>₵ 5.00</span>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>
                  ₵ {(selectedOrder ? selectedOrder.total + 5 : 0).toFixed(2)}
                </span>
              </div>
              <div className="mt-4 flex gap-4 justify-evenly">
                {selectedOrder &&
                  renderActionButton(
                    selectedOrder.status.toLowerCase() as OrderStatus
                  )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-2xl font-bold">No orders found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <motion.div
          className="w-full sm:w-[45%] space-y-4 pr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order.id}
                layoutId={`order-${order.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`p-4 border rounded-xl cursor-pointer ${getStatusColor(
                  order.status.toLowerCase() as OrderStatus
                )} ${
                  selectedOrder?.id === order.id
                    ? "border-2 border-gray-500 opacity-100"
                    : ""
                }`}
                onClick={() => handleOrderClick(order)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <p className="text-xs font-bold">Order ID</p>
                    <p className="font-bold text-sm line-clamp-1 break-all">
                      #{order.id}
                    </p>
                    <p className="mt-1">₵ {order.total.toFixed(2)}</p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-sm line-clamp-1">
                      {new Date(order.orderTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm line-clamp-1">
                      {new Date(order.orderTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!isMobile && (
          <div className="hidden sm:block w-[55%] sticky top-0 h-[calc(100vh-120px)]">
            <AnimatePresence mode="wait">
              {selectedOrder && renderOrderDetails()}
            </AnimatePresence>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isMobile && isDrawerOpen && (
          <Drawer
            anchor="right"
            open={isMobile && isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <motion.div
              className="w-full sm:w-96"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {selectedOrder && renderOrderDetails()}
            </motion.div>
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Orders;
