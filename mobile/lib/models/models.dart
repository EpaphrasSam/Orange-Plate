class ProductModel {
  final String id;
  final String name;
  final double price;
  final String option;
  final String description;
  final bool available;
  final String createdAt;
  final String restaurantId;
  final String categoryId;
  final String imagePath;
  final bool isFavorite;

  ProductModel({
    required this.id,
    required this.name,
    required this.price,
    required this.option,
    required this.description,
    required this.available,
    required this.createdAt,
    required this.restaurantId,
    required this.categoryId,
    required this.imagePath,
    required this.isFavorite,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      price: (json['price'] as num?)?.toDouble() ?? 0.0,
      option: json['option'] as String? ?? '',
      description: json['description'] as String? ?? '',
      available: json['available'] as bool? ?? false,
      createdAt: json['createdAt'] as String? ?? '',
      restaurantId: json['restaurantId'] as String? ?? '',
      categoryId: json['categoryId'] as String? ?? '',
      imagePath: json['imagePath'] as String? ?? 'assets/burger.jpg',
      isFavorite: json['isFavorite'] as bool? ?? false,
    );
  }
}
