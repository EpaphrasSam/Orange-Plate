import { Order, OrderStatus } from "@/types/orderType";

export function processDeliveryData(
  orders: Order[],
  restaurantLocation: { latitude: string; longitude: string }
) {
  const metrics = calculateMetrics(orders);
  const mapData = generateMapData(orders, restaurantLocation);
  const queueOrders = generateQueueOrders(orders);
  const activeDeliveries = generateActiveDeliveries(orders);

  return { metrics, mapData, queueOrders, activeDeliveries };
}

function calculateMetrics(orders: Order[]) {
  const activeDeliveries = orders.filter(
    (order) => order.status === OrderStatus.OnTheWay.toLowerCase()
  ).length;
  const completedDeliveries = orders.filter(
    (order) => order.status === OrderStatus.Delivered.toLowerCase()
  ).length;
  const avgDeliveryTime = calculateAverageDeliveryTime(orders);
  const ordersLookingForRider = orders.filter(
    (order) => order.status === OrderStatus.LookingForRider.toLowerCase()
  ).length;

  return {
    activeDeliveries,
    completedDeliveries,
    avgDeliveryTime,
    ordersLookingForRider,
  };
}

function calculateAverageDeliveryTime(orders: Order[]): string {
  const deliveredOrders = orders.filter(
    (order) =>
      order.status === OrderStatus.Delivered.toLowerCase() && order.deliveryTime
  );
  if (deliveredOrders.length === 0) return "N/A";

  const totalTime = deliveredOrders.reduce((sum, order) => {
    const deliveryTime = new Date(order.deliveryTime!).getTime();
    const orderTime = new Date(order.orderTime).getTime();
    return sum + (deliveryTime - orderTime);
  }, 0);

  console.log(totalTime);

  const avgTimeInMinutes = Math.round(
    totalTime / deliveredOrders.length / 60000
  );
  return `${avgTimeInMinutes} mins`;
}

function generateMapData(
  orders: Order[],
  restaurantLocation: { latitude: string; longitude: string }
) {
  return orders
    .filter(
      (order) =>
        order.status === OrderStatus.OnTheWay.toLowerCase() && order.riderId
    )
    .map((order) => ({
      id: order.id,
      orderId: order.id,
      position: [order.latitude!, order.longitude!],
      status: order.status,
      deliverer: {
        position: [order.Rider!.latitude, order.Rider!.longitude],
        name: order.Rider!.name,
      },
      restaurantPosition: [
        Number(restaurantLocation.latitude),
        Number(restaurantLocation.longitude),
      ],
    }));
}

function generateQueueOrders(orders: Order[]) {
  return orders
    .filter((order) => order.status === OrderStatus.Ready.toLowerCase())
    .map((order) => ({
      id: order.id,
      customerName: order.User.name,
      readyTime: new Date(order.orderTime).toLocaleString(),
    }));
}

function generateActiveDeliveries(orders: Order[]) {
  return orders
    .filter((order) => order.status === OrderStatus.OnTheWay.toLowerCase())
    .map((order) => ({
      id: order.id,
      orderId: order.id,
      driverName: order.Rider!.name,
      eta: generateRandomETA(),
    }));
}

function generateRandomETA(): string {
  const minMinutes = 10;
  const maxMinutes = 45;
  const etaMinutes =
    Math.floor(Math.random() * (maxMinutes - minMinutes + 1)) + minMinutes;
  return `${etaMinutes} mins`;
}
