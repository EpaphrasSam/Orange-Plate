import 'package:flutter/material.dart';

class FavouriteScreen extends StatelessWidget {
  final List<Product> favoriteProducts = [
    Product(
      imageUrl: 'assets/img1.png',
      title: 'Cheese Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Product(
      imageUrl: 'assets/img1.png',
      title: 'Cheese Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Product(
      imageUrl: 'assets/img1.png',
      title: 'Cheese Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Product(
      imageUrl: 'assets/img1.png',
      title: 'Cheese Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    // Add more products here
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Favourite',
          textAlign: TextAlign.left,
        ),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        // centerTitle: true,
        actions: [
          TextButton(
            onPressed: () {
              // TODO: Handle delete all action
            },
            child: const Text(
              'Delete All',
              style: TextStyle(color: Colors.black),
            ),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: favoriteProducts.length,
        itemBuilder: (context, index) {
          return FavouriteProductCard(product: favoriteProducts[index]);
        },
      ),
     
    );
  }
}

class Product {
  final String imageUrl;
  final String title;
  final String description;
  final String price;

  Product({
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.price,
  });
}

class FavouriteProductCard extends StatelessWidget {
  final Product product;

  const FavouriteProductCard({required this.product});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(10),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: Card(
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  // Product Image with rounded corners
                  ClipRRect(
                    borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
                    child: Image.asset(
                      product.imageUrl,
                      width: double.infinity,
                      height: 150,
                      fit: BoxFit.contain,
                    ),
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Icon(
                        Icons.shopping_cart,
                        color: Colors.black,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.all(10),
                color: Colors.orange,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          product.title,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                        const SizedBox(height: 5),
                        Text(
                          product.description,
                          style: const TextStyle(
                            fontSize: 14,
                            color: Colors.black,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        product.price,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
