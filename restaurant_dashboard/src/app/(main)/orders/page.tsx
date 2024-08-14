import Orders from "@/components/pages/orders/Orders";
import { updateSearchParams } from "@/utils/actions/searchParams.action";
import { OrderStatus } from "@/types/order";

// Mock data for orders
const ordersData = [
  {
    id: "303041",
    amount: 640.0,
    status: OrderStatus.OnProcess,
    time: "11:22am",
    items: [{ name: "French fries", price: 200.5, quantity: 3 }],
  },
  {
    id: "303042",
    amount: 200.5,
    status: OrderStatus.InDelivery,
    time: "11:30am",
    items: [{ name: "French fries", price: 200.5, quantity: 1 }],
  },
  {
    id: "303043",
    amount: 200.5,
    status: OrderStatus.Completed,
    time: "11:40am",
    items: [{ name: "French fries", price: 200.5, quantity: 1 }],
  },
  {
    id: "303044",
    amount: 200.5,
    status: OrderStatus.Rejected,
    time: "11:50am",
    items: [{ name: "French fries", price: 200.5, quantity: 1 }],
  },
  {
    id: "303045",
    amount: 200.5,
    status: OrderStatus.OnProcess,
    time: "11:50am",
    items: [{ name: "French fries", price: 200.5, quantity: 1 }],
  },
];

const orderStatuses = [
  OrderStatus.OnProcess,
  OrderStatus.InDelivery,
  OrderStatus.Completed,
  OrderStatus.Rejected,
];

const getStatusColor = (status: OrderStatus, isSelected: boolean) => {
  switch (status) {
    case OrderStatus.OnProcess:
      return isSelected
        ? "bg-gray-300 text-gray-800"
        : "bg-gray-200 text-gray-800";
    case OrderStatus.InDelivery:
      return isSelected
        ? "bg-orange-500 text-white"
        : "bg-orange-200 text-orange-800";
    case OrderStatus.Completed:
      return isSelected
        ? "bg-green-500 text-white"
        : "bg-green-200 text-green-800";
    case OrderStatus.Rejected:
      return isSelected ? "bg-red-500 text-white" : "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const currentStatus =
    searchParams.status?.toLowerCase() || OrderStatus.OnProcess.toLowerCase();
  const filteredOrders = currentStatus
    ? ordersData.filter((order) => order.status.toLowerCase() === currentStatus)
    : ordersData;

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {orderStatuses.map((status) => (
          <form key={status} action={updateSearchParams}>
            <input type="hidden" name="status" value={status} />
            <input type="hidden" name="_url" value="/orders" />

            <button
              type="submit"
              className={`px-2 flex-shrink-0 py-2 w-[150px] rounded-full ${getStatusColor(
                status,
                currentStatus === status.toLowerCase()
              )}`}
            >
              {status}
            </button>
          </form>
        ))}
      </div>
      <Orders orders={filteredOrders} />
    </div>
  );
}
