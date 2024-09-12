import 'package:mobile/models/models.dart';
import 'package:mobile/models/user_model.dart';

class OrderModel {
  final String id;
  final String status;
  final double total;
  final DateTime orderTime;
  final DateTime? deliveryTime;
  final double? deliveryFee;
  final String userId;
  final String restaurantId;
  final String? riderId;
  final double? latitude;
  final double? longitude;
  final RestaurantModel restaurant;
  final RiderModel? rider;
  final UserModel user;
  final List<CartItemModel> cartItems;

  OrderModel({
    required this.id,
    required this.status,
    required this.total,
    required this.orderTime,
    this.deliveryTime,
    this.deliveryFee,
    required this.userId,
    required this.restaurantId,
    this.riderId,
    this.latitude,
    this.longitude,
    required this.restaurant,
    this.rider,
    required this.user,
    required this.cartItems,
  });

  factory OrderModel.fromJson(Map<String, dynamic> json) {
    return OrderModel(
      id: json['id'],
      status: json['status'],
      total: double.parse(json['total'].toString()),
      orderTime: DateTime.parse(json['orderTime']),
      deliveryTime: json['deliveryTime'] != null
          ? DateTime.parse(json['deliveryTime'])
          : null,
      deliveryFee: json['deliveryFee'] != null
          ? double.parse(json['deliveryFee'].toString())
          : null,
      userId: json['userId'],
      restaurantId: json['restaurantId'],
      riderId: json['riderId'],
      latitude: json['latitude'] != null
          ? double.parse(json['latitude'].toString())
          : null,
      longitude: json['longitude'] != null
          ? double.parse(json['longitude'].toString())
          : null,
      restaurant: RestaurantModel.fromJson(json['restaurant']),
      rider: json['Rider'] != null ? RiderModel.fromJson(json['Rider']) : null,
      user: UserModel.fromJson(json['User']),
      cartItems: json['CartItem'] != null
          ? (json['CartItem'] as List)
              .map((item) => CartItemModel.fromJson(item))
              .toList()
          : [], // If CartItem is null, use an empty list
    );
  }
}

class CartItemModel {
  final String id;
  final int quantity;
  final String menuItemId;
  final String userId;
  final String orderId;
  final MenuItemModel menuItem;

  CartItemModel({
    required this.id,
    required this.quantity,
    required this.menuItemId,
    required this.userId,
    required this.orderId,
    required this.menuItem,
  });

  factory CartItemModel.fromJson(Map<String, dynamic> json) {
    return CartItemModel(
      id: json['id'],
      quantity: json['quantity'],
      menuItemId: json['menuItemId'],
      userId: json['userId'],
      orderId: json['orderId'],
      menuItem: MenuItemModel.fromJson(json['MenuItem']),
    );
  }
}

class RiderModel {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String? address;
  final DateTime createdAt;

  RiderModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    this.address,
    required this.createdAt,
  });

  factory RiderModel.fromJson(Map<String, dynamic> json) {
    return RiderModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
      phone: json['phone'],
      address: json['address'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}

class MenuItemModel {
  final String id;
  final String name;
  final double price;
  final String? option;
  final String? description;
  final String? image;
  final bool available;
  final DateTime createdAt;
  final String restaurantId;
  final String categoryId;

  MenuItemModel({
    required this.id,
    required this.name,
    required this.price,
    this.option,
    this.description,
    this.image,
    required this.available,
    required this.createdAt,
    required this.restaurantId,
    required this.categoryId,
  });

  factory MenuItemModel.fromJson(Map<String, dynamic> json) {
    return MenuItemModel(
      id: json['id'],
      name: json['name'],
      price: double.parse(json['price'].toString()),
      option: json['option'],
      description: json['description'],
      image: json['image'],
      available: json['available'] ?? true,
      createdAt: DateTime.parse(json['createdAt']),
      restaurantId: json['restaurantId'],
      categoryId: json['categoryId'],
    );
  }
}
