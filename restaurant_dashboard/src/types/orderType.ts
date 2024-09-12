export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Ready = "Ready",
  LookingForRider = "Looking for Rider",
  RiderAssigned = "Rider Assigned",
  OnTheWay = "On the Way",
  Delivered = "Delivered",
}

export interface Order {
  id: string;
  status: OrderStatus;
  total: number;
  orderTime: string;
  deliveryTime: string | null;
  deliveryFee: number | null;
  userId: string;
  restaurantId: string;
  riderId: string | null;
  latitude: number | null;
  longitude: number | null;
  User: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  CartItem: {
    id: string;
    quantity: number;
    menuItemId: string;
    userId: string;
    orderId: string;
    MenuItem: {
      id: string;
      name: string;
      price: number;
      option: string;
      description: string;
      image: string;
      available: boolean;
      createdAt: string;
      restaurantId: string;
      categoryId: string;
    };
  }[];
  Rider: {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
  } | null;
}
