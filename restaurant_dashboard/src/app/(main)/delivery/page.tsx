import dynamic from "next/dynamic";
import OrderQueue from "../../../components/pages/delivery/OrderQueue";
import ActiveDeliveries from "../../../components/pages/delivery/ActiveDeliveries";
import DeliveryMetrics from "../../../components/pages/delivery/DeliveryMetrics";
import { auth } from "@/utils/auth";
import { getDeliveryData } from "@/services/deliveryService";
import ErrorToast from "@/components/ui/ErrorToast";

const DeliveryMap = dynamic(
  () => import("../../../components/pages/delivery/DeliveryMap"),
  { ssr: false }
);

export const revalidate = 0;

export default async function Delivery() {
  let deliveryData: any = {
    metrics: {},
    mapData: [],
    queueOrders: [],
    activeDeliveries: [],
  };
  let error: string | null = null;
  let session;

  try {
    session = await auth();
    if (!session || !session.user.token) {
      throw new Error("Unauthorized");
    }

    deliveryData = await getDeliveryData();
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
  }

  return (
    <div className="p-4 space-y-8">
      {error && <ErrorToast error={error} />}
      <DeliveryMetrics metrics={deliveryData.metrics} />

      <div className="w-full space-y-8">
        {session && (
          <DeliveryMap
            deliveries={deliveryData.mapData}
            restaurantPosition={[
              parseFloat(session.user.latitude!),
              parseFloat(session.user.longitude!),
            ]}
          />
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <OrderQueue orders={deliveryData.queueOrders} />
        </div>
        <div className="flex-1">
          <ActiveDeliveries deliveries={deliveryData.activeDeliveries} />
        </div>
      </div>
    </div>
  );
}
