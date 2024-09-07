class ProductModel {
  final String name;
  final String imagePath;

  ProductModel({required this.name, required this.imagePath});

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      name: json['name'] as String,
      imagePath: json['imagePath'] as String,
    );
  }
}
