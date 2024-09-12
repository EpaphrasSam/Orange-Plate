import 'package:flutter/material.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/screens/product_details_screen.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:mobile/constants/file_path.dart';

class CategoryDetailsScreen extends StatelessWidget {
  final CategoryModel category;

  const CategoryDetailsScreen({Key? key, required this.category})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(category.name),
      ),
      body: category.menuItems.isEmpty
          ? const Center(
              child: Text(
                'No products available in this category.',
                style: TextStyle(fontSize: 18),
              ),
            )
          : ListView.builder(
              itemCount: category.menuItems.length,
              itemBuilder: (context, index) {
                final product = category.menuItems[index];
                return Card(
                  margin:
                      const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  child: ListTile(
                    leading: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: CachedNetworkImage(
                        imageUrl: product.option,
                        placeholder: (context, url) =>
                            Image.asset(placeHolderPath),
                        errorWidget: (context, url, error) =>
                            Image.asset(placeHolderPath),
                        width: 60,
                        height: 60,
                        fit: BoxFit.cover,
                      ),
                    ),
                    title: Text(product.name),
                    subtitle: Text('\GH₵${product.price.toStringAsFixed(2)}'),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ProductDetailsScreen(
                            product: product,
                          ),
                        ),
                      );
                    },
                  ),
                );
              },
            ),
    );
  }
}
