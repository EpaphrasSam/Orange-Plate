import { auth } from "@/utils/auth";
import axios from "@/utils/axios";
import { processDeliveryData } from "@/helpers/deliveryConverter";

export async function getDeliveryData() {
  const session = await auth();
  if (!session || !session.user.token) {
    throw new Error("Unauthorized");
  }

  try {
    const response = await axios.get(
      `/restaurant/orders/${session?.user?.id}`,
      {
        headers: { Authorization: `${session?.user?.token}` },
      }
    );
    const processedData = processDeliveryData(response.data.orders, {
      latitude: session.user.latitude,
      longitude: session.user.longitude,
    });
    return processedData;
  } catch (error: any) {
    console.error(error.response);
    throw new Error("Failed to fetch delivery data");
  }
}

// The getLocationFromCoordinates function has been removed
