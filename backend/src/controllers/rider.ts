import { Request, Response, NextFunction } from "express";
import CustomError from "../util/error";
import * as dataValidation from "../util/dataValidation";
import * as jwt from "../util/jwt";
import * as riderService from "../services/rider";
import * as orderService from "../services/resturant";
import * as notification from "../util/notification";

//rider home
export const riderHome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const riderId: string = req.params.id;
  const riderLocation: { latitude: number; longitude: number } = req.body;
  try {
    await jwt.verifyToken(token);
    await dataValidation.getById(riderId);
    await dataValidation.validateUserLocationData(riderLocation);
    await riderService.updateLocation(riderId, riderLocation);
    const rider = await riderService.getRider(riderId);
    res.status(200).json({
      message: "Welcome to the rider home page",
      rider,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error fetching rider home",
    });
  }
};

//accept order
export const acceptOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const { riderId, orderId } = req.body;
  // const riderId: string = req.query.riderId as string;
  // const orderId: string = req.query.orderId as string;
  try {
    await jwt.verifyToken(token);
    await dataValidation.getById(riderId);
    await dataValidation.getById(orderId);
    const order = await riderService.acceptOrder(riderId, orderId);
    await notification.sendOrderStatusNotification(
      order.User.id,
      order.id,
      order.status
    );
    res.status(200).json({
      message: "Order accepted",
      order,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error accepting order",
    });
  }
};

export const riderOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const riderId: string = req.params.id;
  try {
    await jwt.verifyToken(token);
    await dataValidation.getById(riderId);
    const orders = await riderService.getRiderOrders(riderId);
    res.status(200).json({
      message: "Rider orders fetched successfully",
      orders,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error fetching rider orders",
    });
  }
};

//end trip
export const endTrip = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const { id: riderId } = req.params;
  const { orderId } = req.body;

  try {
    await Promise.all([
      jwt.verifyToken(token),
      dataValidation.getById(riderId),
      dataValidation.getById(orderId),
    ]);

    const order = await riderService.endTrip(riderId, orderId);

    const orderDetails = {
      id: order.id,
      status: order.status,
      total: order.total,
      orderTime: order.orderTime,
      deliveryTime: order.deliveryTime,
      deliveryFee: order.deliveryFee,
      userId: order.User.id,
      userName: order.User.name,
      riderName: order.Rider?.name,
      vehicleNumber: order.Rider?.vehicleNumber,
      menuItems: order.CartItem.map((item) => ({
        name: item.MenuItem.name,
        quantity: item.quantity,
        price: item.MenuItem.price,
        total: item.MenuItem.price * item.quantity,
      })),
    };

    await notification.sendPaymentPromptNotification(orderDetails);

    res.status(200).json({
      message: "Trip ended: Customer will be prompted to make payment",
      orderDetails,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error ending trip",
    });
  }
};

//get orders
export const getRiderStatistics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers.authorization;
  const riderId: string = req.params.id;
  try {
    await jwt.verifyToken(token);
    await dataValidation.getById(riderId);
    const riderOrders = await riderService.getRiderStatistics(riderId);
    const totalOrders = riderOrders.length;
    const deliveredOrders = riderOrders.filter(
      (order) => order.status === "delivered"
    );
    const totalSuccessfulDeliveries = deliveredOrders.length;
    const totalEarnings = deliveredOrders.reduce(
      (acc, order) => acc + (order.deliveryFee || 0),
      0
    );
    const weeklyEarnings = riderOrders.reduce((acc, order) => {
      const orderDate = new Date(order.deliveryTime || "");
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays <= 7) {
        const dayOfWeek = orderDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
        acc[dayOfWeek] = (acc[dayOfWeek] || 0) + (order.deliveryFee || 0);
      }
      return acc;
    }, Array(7).fill(0));

    const dailyEarnings = {
      Sunday: weeklyEarnings[0],
      Monday: weeklyEarnings[1],
      Tuesday: weeklyEarnings[2],
      Wednesday: weeklyEarnings[3],
      Thursday: weeklyEarnings[4],
      Friday: weeklyEarnings[5],
      Saturday: weeklyEarnings[6],
    };

    res.status(200).json({
      message: "Rider statistics fetched successfully",
      totalOrders,
      totalSuccessfulDeliveries,
      totalEarnings,
      dailyEarnings,
    });
  } catch (err: any) {
    next({
      status: err.statusCode || 400,
      message: err.message || "Error fetching rider statistics",
    });
  }
};
