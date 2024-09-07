import 'dart:convert';

class FavoriteItem {
  final String id;
  final MenuItem menuItem;

  FavoriteItem({
    required this.id,
    required this.menuItem,
  });

  factory FavoriteItem.fromJson(Map<String, dynamic> json) {
    return FavoriteItem(
      id: json['id'] as String? ?? '',
      menuItem:
          MenuItem.fromJson(json['menuItem'] as Map<String, dynamic>? ?? {}),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'menuItem': menuItem.toJson(),
    };
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

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'price': price,
      'option': option,
      'description': description,
      'available': available,
      'createdAt': createdAt,
      'restaurantId': restaurantId,
      'categoryId': categoryId,
    };
  }
}

class FavoriteList {
  List<FavoriteItem> items;

  FavoriteList({required this.items});

  factory FavoriteList.fromJson(String jsonString) {
    final List<dynamic> jsonList = json.decode(jsonString);
    return FavoriteList(
      items: jsonList.map((item) => FavoriteItem.fromJson(item)).toList(),
    );
  }

  String toJson() {
    return json.encode(items.map((item) => item.toJson()).toList());
  }

  void addItem(FavoriteItem item) {
    items.add(item);
  }

  void removeItem(String id) {
    items.removeWhere((item) => item.id == id);
  }

  bool contains(String id) {
    return items.any((item) => item.id == id);
  }
}
