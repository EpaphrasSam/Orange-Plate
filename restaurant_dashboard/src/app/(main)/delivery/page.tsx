import dynamic from "next/dynamic";
import OrderQueue from "../../../components/pages/delivery/OrderQueue";
import ActiveDeliveries from "../../../components/pages/delivery/ActiveDeliveries";
import DeliveryMetrics from "../../../components/pages/delivery/DeliveryMetrics";
import { auth } from "@/utils/auth";
import { getDeliveryData } from "@/services/deliveryService";

const DeliveryMap = dynamic(
  () => import("../../../components/pages/delivery/DeliveryMap"),
  { ssr: false }
);

export default async function DeliveryPage() {
  const session = await auth();
  const { metrics, mapData, queueOrders, activeDeliveries } = await getDeliveryData();

  return (
    <div className="p-4 space-y-8">
      <DeliveryMetrics metrics={metrics} />

      <div className="w-full space-y-8">
        <DeliveryMap
          deliveries={mapData}
          restaurantPosition={[
            parseFloat(session?.user?.latitude!),
            parseFloat(session?.user?.longitude!),
          ]}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <OrderQueue orders={queueOrders} />
        </div>
        <div className="flex-1">
          <ActiveDeliveries deliveries={activeDeliveries} />
        </div>
      </div>
    </div>
  );
}
