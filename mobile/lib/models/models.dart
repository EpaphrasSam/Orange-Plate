class RestaurantModel {
  final String id;
  final String name;
  final String email;
  final String phone;
  final String address;
  final String? image;
  final String latitude;
  final String longitude;
  final String openingHours;
  final String closingHours;
  final String createdAt;
  List<ProductModel> menuItems; // Make this mutable

  RestaurantModel({
    required this.id,
    required this.name,
    required this.email,
    required this.phone,
    required this.address,
    this.image,
    required this.latitude,
    required this.longitude,
    required this.openingHours,
    required this.closingHours,
    required this.createdAt,
    required this.menuItems,
  });

  factory RestaurantModel.fromJson(Map<String, dynamic> json) {
    print('Parsing restaurant: ${json['name']}');
    List<ProductModel> menuItems = [];
    if (json['menuItems'] != null) {
      menuItems = (json['menuItems'] as List)
          .map((item) => ProductModel.fromJson(item))
          .toList();
    }
    print('Parsed ${menuItems.length} menu items for ${json['name']}');
    return RestaurantModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      email: json['email'] ?? '',
      phone: json['phone'] ?? '',
      address: json['address'] ?? '',
      image: json['image'],
      latitude: json['latitude'] ?? '',
      longitude: json['longitude'] ?? '',
      openingHours: json['openingHours'] ?? '',
      closingHours: json['closingHours'] ?? '',
      createdAt: json['createdAt'] ?? '',
      menuItems: menuItems,
    );
  }

  // Add this method for debugging
  void printDetails() {
    print('Restaurant: $name');
    print('Menu Items: ${menuItems.length}');
    for (var item in menuItems) {
      print('- ${item.name}: \GH₵${item.price}');
    }
  }
}

class ProductModel {
  final String id;
  final String name;
  final double price;
  final String option;
  final String description;
  final String? image;
  final bool available;
  final String createdAt;
  final String restaurantId;
  final String categoryId;
  // final String restaurantName;

  ProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.option,
    required this.description,
    this.image,
    required this.available,
    required this.createdAt,
    required this.restaurantId,
    required this.categoryId,
    // required this.restaurantName,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      option: json['option'] ?? '',
      description: json['description'] ?? '',
      image: json['image'],
      available: json['available'] ?? false,
      createdAt: json['createdAt'] ?? '',
      restaurantId: json['restaurantId'] ?? '',
      categoryId: json['categoryId'] ?? '',
      // restaurantName: json['restaurantName'] ?? '',
    );
  }
}

class CategoryModel {
  final String id;
  final String name;
  final String image;
  final List<ProductModel> menuItems;

  CategoryModel({
    required this.id,
    required this.name,
    required this.image,
    required this.menuItems,
  });

  factory CategoryModel.fromJson(Map<String, dynamic> json) {
    return CategoryModel(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      image: json['image'] as String? ?? '',
      menuItems: (json['MenuItem'] as List<dynamic>?)
              ?.map((item) => ProductModel.fromJson(item))
              .toList() ??
          [],
    );
  }
}
