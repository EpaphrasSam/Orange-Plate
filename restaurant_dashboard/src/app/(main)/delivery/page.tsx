import dynamic from "next/dynamic";
import OrderQueue from "../../../components/pages/delivery/OrderQueue";
import ActiveDeliveries from "../../../components/pages/delivery/ActiveDeliveries";
import DeliveryMetrics from "../../../components/pages/delivery/DeliveryMetrics";

const DeliveryMap = dynamic(
  () => import("../../../components/pages/delivery/DeliveryMap"),
  {
    ssr: false,
  }
);

// Mock data (replace with actual data fetching logic)
const mockDeliveries = [
  {
    id: 1,
    orderId: "001",
    position: [6.6988, -1.6369],
    status: "In Progress",
    deliverer: {
      position: [6.6958, -1.6339],
      name: "Mike",
    },
  },
  {
    id: 2,
    orderId: "002",
    position: [6.7018, -1.628],
    status: "Picked Up",
    deliverer: {
      position: [6.6988, -1.631],
      name: "Sarah",
    },
  },
  {
    id: 3,
    orderId: "003",
    position: [6.6958, -1.623],
    status: "In Progress",
    deliverer: {
      position: [6.6928, -1.626],
      name: "John",
    },
  },
  {
    id: 4,
    orderId: "004",
    position: [6.7048, -1.635],
    status: "Picked Up",
    deliverer: {
      position: [6.7018, -1.638],
      name: "Emma",
    },
  },
];

const mockOrders = [
  { id: "001", customerName: "John Doe", readyTime: "10 mins ago" },
  { id: "002", customerName: "Jane Smith", readyTime: "5 mins ago" },
];

const mockActiveDeliveries = [
  { id: 1, orderId: "001", driverName: "Mike", eta: "15 mins" },
  { id: 2, orderId: "002", driverName: "Sarah", eta: "20 mins" },
];

const mockMetrics = {
  activeDeliveries: 5,
  avgDeliveryTime: "28 mins",
  completedDeliveries: 42,
  delayedDeliveries: 2,
};

export default function DeliveryPage() {
  return (
    <div className="p-4 space-y-8">
      <DeliveryMetrics metrics={mockMetrics} />

      <div className="w-full space-y-8">
        <DeliveryMap deliveries={mockDeliveries} radius={5} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <OrderQueue orders={mockOrders} />
        </div>
        <div className="flex-1">
          <ActiveDeliveries deliveries={mockActiveDeliveries} />
        </div>
      </div>
    </div>
  );
}
