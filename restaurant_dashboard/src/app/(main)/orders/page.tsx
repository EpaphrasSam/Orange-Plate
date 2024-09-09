import Orders from "@/components/pages/orders/Orders";
import { updateSearchParams } from "@/utils/actions/searchParams.action";
import { Order, OrderStatus } from "@/types/orderType";
import { getOrders } from "@/services/orderService";
import { Button } from "@nextui-org/react";

const getStatusColor = (status: OrderStatus, isSelected: boolean) => {
  switch (status) {
    case OrderStatus.Pending:
      return isSelected ? "bg-[#FFD700] text-black" : "bg-[#FFFACD] text-black";
    case OrderStatus.Processing:
      return isSelected ? "bg-[#FF6347] text-white" : "bg-[#FFA07A] text-black";
    case OrderStatus.Ready:
      return isSelected ? "bg-[#32CD32] text-white" : "bg-[#90EE90] text-black";
    case OrderStatus.LookingForRider:
      return isSelected ? "bg-[#4169E1] text-white" : "bg-[#87CEFA] text-black";
    case OrderStatus.RiderAssigned:
      return isSelected ? "bg-[#8A2BE2] text-white" : "bg-[#E6E6FA] text-black";
    case OrderStatus.OnTheWay:
      return isSelected ? "bg-[#FF4500] text-white" : "bg-[#FFA500] text-black";
    case OrderStatus.Delivered:
      return isSelected ? "bg-[#228B22] text-white" : "bg-[#98FB98] text-black";
    default:
      return isSelected ? "bg-[#A9A9A9] text-white" : "bg-[#D3D3D3] text-black";
  }
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const currentStatus =
    (searchParams.status as OrderStatus) || OrderStatus.Pending;
  const orders = await getOrders();

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
      <div className="flex space-x-4 mb-4 overflow-x-auto whitespace-nowrap">
        {Object.values(OrderStatus).map((status) => (
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
                currentStatus === status
              )}`}
            >
              {status}
            </Button>
          </form>
        ))}
      </div>
      <Orders orders={statusFilteredOrders} />
    </div>
  );
}
