class CartProduct {
  final String id;
  int quantity; // Changed from final to allow modifications
  final String menuItemId;
  final String userId;
  final MenuItem menuItem;
  bool isChecked; // Add this line

  CartProduct({
    required this.id,
    required this.quantity,
    required this.menuItemId,
    required this.userId,
    required this.menuItem,
    this.isChecked = false,
  });

  factory CartProduct.fromJson(Map<String, dynamic> json) {
    return CartProduct(
      id: json['id'] as String? ?? '',
      quantity: json['quantity'] as int? ?? 0,
      menuItemId: json['menuItemId'] as String? ?? '',
      userId: json['userId'] as String? ?? '',
      menuItem:
          MenuItem.fromJson(json['MenuItem'] as Map<String, dynamic>? ?? {}),
    );
  }

  // Add a method to update the quantity
  void updateQuantity(int newQuantity) {
    quantity = newQuantity;
  }

  // You might want to add a method to toggle the checked state
  void toggleChecked() {
    isChecked = !isChecked;
  }
}

class MenuItem {
  final String id;
  final String name;
  final double price;
  final String option;
  final String description;
  final bool available;
  final String createdAt;
  final String restaurantId;
  final String categoryId;

  MenuItem({
    required this.id,
    required this.name,
    required this.price,
    required this.option,
    required this.description,
    required this.available,
    required this.createdAt,
    required this.restaurantId,
    required this.categoryId,
  });

  factory MenuItem.fromJson(Map<String, dynamic> json) {
    return MenuItem(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      option: json['option'] as String? ?? '',
      description: json['description'] as String? ?? '',
      available: json['available'] as bool? ?? false,
      createdAt: json['createdAt'] as String? ?? '',
      restaurantId: json['restaurantId'] as String? ?? '',
      categoryId: json['categoryId'] as String? ?? '',
    );
  }
}
