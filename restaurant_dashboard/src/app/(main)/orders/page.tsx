import { useState } from "react";
import Orders from "@/components/pages/orders/Orders";
import { updateSearchParams } from "@/utils/actions/searchParams.action";
import { Order, OrderStatus } from "@/types/orderType";
import { getOrders } from "@/services/orderService";
import { Button } from "@nextui-org/react";
import ErrorToast from "@/components/ui/ErrorToast"; // Create this client component

const getStatusColor = (status: OrderStatus, isSelected: boolean) => {
  switch (status) {
    case OrderStatus.Pending:
      return isSelected
        ? "bg-[#FFD700] text-black font-bold"
        : "bg-[#FFFACD] text-black";
    case OrderStatus.Processing:
      return isSelected
        ? "bg-[#FF6347] text-white font-bold"
        : "bg-[#FFA07A] text-black";
    case OrderStatus.Ready:
      return isSelected
        ? "bg-[#32CD32] text-white font-bold"
        : "bg-[#90EE90] text-black";
    case OrderStatus.LookingForRider:
      return isSelected
        ? "bg-[#4169E1] text-white font-bold"
        : "bg-[#87CEFA] text-black";
    case OrderStatus.RiderAssigned:
      return isSelected
        ? "bg-[#8A2BE2] text-white font-bold"
        : "bg-[#E6E6FA] text-black";
    case OrderStatus.OnTheWay:
      return isSelected
        ? "bg-[#FF4500] text-white font-bold"
        : "bg-[#FFA500] text-black";
    case OrderStatus.Delivered:
      return isSelected
        ? "bg-[#228B22] text-white font-bold"
        : "bg-[#98FB98] text-black";
    default:
      return isSelected
        ? "bg-[#A9A9A9] text-white font-bold"
        : "bg-[#D3D3D3] text-black";
  }
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const currentStatus =
    (searchParams.status as OrderStatus) || OrderStatus.Pending;
  let orders: Order[] = [];
  let error: string | null = null;

  try {
    orders = await getOrders();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  // Filter out orders with empty CartItem arrays
  const filteredOrders = orders.filter(
    (order: Order) => order.CartItem && order.CartItem.length > 0
  );

  // Filter orders based on the current status
  const statusFilteredOrders = currentStatus
    ? filteredOrders.filter(
        (order: Order) =>
          order.status.toLowerCase() === currentStatus.toLowerCase()
      )
    : filteredOrders;

  return (
    <div className="p-4">
      {error && <ErrorToast error={error} />}
      <div className="flex space-x-4 mb-6 overflow-x-auto w-full">
        {Object.values(OrderStatus).map((status) => {
          const isSelected =
            currentStatus.toLowerCase() === status.toLowerCase();
          return (
            <form
              key={status}
              action={updateSearchParams}
              className="inline-block"
            >
              <input type="hidden" name="status" value={status} />
              <input type="hidden" name="_url" value="/orders" />

              <Button
                type="submit"
                className={`px-4 py-2 rounded-full ${getStatusColor(
                  status as OrderStatus,
                  isSelected
                )} ${isSelected ? "shadow-md" : ""}`}
              >
                {status}
              </Button>
            </form>
          );
        })}
      </div>
      <Orders orders={statusFilteredOrders} />
    </div>
  );
}
