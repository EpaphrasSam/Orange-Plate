"use client";

import React, { useState, useEffect } from "react";
import { OrderStatus } from "@/types/order";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import { Button, Card, Divider } from "@nextui-org/react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  amount: number;
  status: OrderStatus;
  time: string;
  items: OrderItem[];
}

interface OrdersProps {
  orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders[0] || null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.OnProcess:
        return "bg-gray-100 text-gray-800";
      case OrderStatus.InDelivery:
        return "bg-orange-100 text-orange-800";
      case OrderStatus.Completed:
        return "bg-green-100 text-green-800";
      case OrderStatus.Rejected:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    if (isMobile) {
      setIsDrawerOpen(true);
    }
  };

  const renderOrderDetails = () => (
    <Card className="flex flex-col h-full p-4 bg-[#F9F9F9]">
      <div className="p-4 border-b">
        <div className="flex justify-between">
          <div className="flex flex-col mb-2">
            <p className="text-xs font-bold text-gray-500">Order ID</p>
            <p className="text-gray-700 text-sm">#{selectedOrder?.id}</p>
          </div>
          <p className="text-gray-600">{selectedOrder?.time}</p>
        </div>
        <p
          className={`${getStatusColor(
            selectedOrder?.status || OrderStatus.OnProcess
          )} inline-block px-4 py-1 rounded-full mt-2`}
        >
          {selectedOrder?.status}
        </p>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {selectedOrder?.items.map((item, index) => (
          <div key={index} className="flex mb-4">
            <div className="w-16 flex-shrink-0 mr-4">
              <Image
                src="/burger.jpg"
                alt={item.name}
                width={100}
                height={100}
                className="w-16 h-16 object-cover rounded"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-800 font-bold">{item.name}</p>
                  <p className="text-gray-500 text-xs">Burgers</p>
                  <p className="text-gray-600 text-sm mt-1">
                    ₵ {item.price.toFixed(2)}
                    <span className="text-xs font-bold ml-1">
                      x {item.quantity}
                    </span>
                  </p>
                </div>
                <p className="text-gray-600 text-sm">
                  ₵ {(item.price * item.quantity).toFixed(2)}
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
          <span>₵ {selectedOrder?.amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery</span>
          <span>₵ 5.00</span>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>
            ₵ {(selectedOrder ? selectedOrder.amount + 5 : 0).toFixed(2)}
          </span>
        </div>
        {(selectedOrder?.status === OrderStatus.OnProcess ||
          selectedOrder?.status === OrderStatus.InDelivery) && (
          <div className="mt-4 flex gap-4 justify-evenly">
            <Button
              color="danger"
              variant="bordered"
              className="max-w-[200px] w-full"
            >
              Reject
            </Button>
            {selectedOrder.status === OrderStatus.InDelivery && (
              <Button color="success" className="max-w-[200px] w-full">
                Complete
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="flex">
      <div className="w-full sm:w-[45%] space-y-4 pr-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`p-4 border rounded-xl cursor-pointer ${getStatusColor(
              order.status
            )} ${
              selectedOrder?.id === order.id
                ? "border-2 border-gray-500 opacity-100"
                : ""
            }`}
            onClick={() => handleOrderClick(order)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">Order ID: #{order.id}</h3>
                <p>₵ {order.amount.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p>{order.time}</p>
                {/* <p className="font-semibold">{order.status}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!isMobile && (
        <div className="hidden sm:block w-[55%] sticky top-0 h-[calc(100vh-120px)]">
          {selectedOrder && renderOrderDetails()}
        </div>
      )}
      <Drawer
        anchor="right"
        open={isMobile && isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="w-full sm:w-96">
          {selectedOrder && renderOrderDetails()}
        </div>
      </Drawer>
    </div>
  );
};

export default Orders;
