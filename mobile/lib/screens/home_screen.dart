import 'package:flutter/material.dart';
import 'package:mobile/functions/logout_func.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/services/api_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<ProductModel> products = [];

  @override
  void initState() {
    super.initState();
    _checkLocationServicesAndFetchProducts(); // Check location services and fetch products
    printStoredUserData(); // Print stored user data
  }

  void _checkLocationServicesAndFetchProducts() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      _showLocationServicesDialog();
      return;
    }

    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        _showLocationPermissionDialog();
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      _showLocationPermissionDialog();
      return;
    }

    fetchProducts(); // Fetch products when location services are enabled and permissions are granted
  }

  void _showLocationServicesDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Location Services Disabled'),
          content: const Text(
              'Please enable location services to use this feature.'),
          actions: [
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                Geolocator.openLocationSettings();
              },
            ),
          ],
        );
      },
    );
  }

  void _showLocationPermissionDialog() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Location Permission Denied'),
          content: const Text(
              'Please grant location permission to use this feature.'),
          actions: [
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                Geolocator.openAppSettings();
              },
            ),
          ],
        );
      },
    );
  }

  void fetchProducts() async {
    Position position = await _determinePosition();
    double latitude = position.latitude;
    double longitude = position.longitude;

    print('Coordinates: Latitude = $latitude, Longitude = $longitude');

    try {
      var fetchedProducts =
          await ApiService().fetchProducts(latitude, longitude);
      print(
          'Response body: $fetchedProducts'); // Print the response body for debugging

      if (fetchedProducts is List<dynamic>) {
        setState(() {
          products = fetchedProducts
              .map(
                  (item) => ProductModel.fromJson(item as Map<String, dynamic>))
              .toList();
        });
      } else {
        print('Error: fetched products are not of type List<dynamic>');
      }
    } catch (e) {
      print('Failed to fetch products: $e');
    }
  }

  Future<Position> _determinePosition() async {
    return await Geolocator.getCurrentPosition();
  }

  void printStoredUserData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? storedUserId = prefs.getString('userId');
    String? storedUserToken = prefs.getString('userToken');
    print('Stored User ID: $storedUserId');
    print('Stored User Token: $storedUserToken');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const Padding(
          padding: EdgeInsets.all(8.0),
          child: CircleAvatar(
            backgroundImage: AssetImage('assets/man.jpg'),
          ),
        ),
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Hello, Chris!'),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.exit_to_app),
            onPressed: () {
              logout(context); // Call the logout function
            },
          ),
        ],
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Banner Image
            ClipRRect(
              borderRadius: BorderRadius.circular(16.0),
              child: Container(
                margin: const EdgeInsets.all(16.0),
                height: 200,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16.0),
                  image: const DecorationImage(
                    image: AssetImage(
                        'assets/burger.jpg'), // Replace with your image
                    fit: BoxFit.cover, // Changed to cover for a better fit
                  ),
                ),
              ),
            ),

            // Categories
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  CategoryIcon(icon: Icons.star, label: 'Popular'),
                  CategoryIcon(icon: Icons.local_pizza, label: 'Western'),
                  CategoryIcon(icon: Icons.local_drink, label: 'Drinks'),
                  CategoryIcon(icon: Icons.restaurant, label: 'Local'),
                ],
              ),
            ),
            // Cuisines Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Cuisines',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75, // Adjusted for better fit
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    itemCount: cuisines.length,
                    itemBuilder: (context, index) {
                      return CuisineCard(cuisine: cuisines[index]);
                    },
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  const Text('Restaurants',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75, // Adjusted for better fit
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    itemCount: restaurants.length,
                    itemBuilder: (context, index) {
                      return RestaurantCard(restaurant: restaurants[index]);
                    },
                  ),
                ],
              ),
            ),
            // Products Section
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Products',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75,
                      crossAxisSpacing: 10,
                      mainAxisSpacing: 10,
                    ),
                    itemCount: products.length,
                    itemBuilder: (context, index) {
                      return ProductCard(product: products[index]);
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class CategoryIcon extends StatelessWidget {
  final IconData icon;
  final String label;

  const CategoryIcon({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 60,
          height: 60,
          decoration: BoxDecoration(
            border:
                Border.all(color: Colors.orange, width: 2), // Circular border
            shape: BoxShape.circle,
          ),
          child: Icon(icon, size: 32, color: Colors.orange),
        ),
        const SizedBox(height: 4),
        Text(label,
            style: const TextStyle(fontWeight: FontWeight.bold)), // Label text
      ],
    );
  }
}

class CuisineCard extends StatelessWidget {
  final Cuisine cuisine;

  const CuisineCard({required this.cuisine});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16.0),
              image: DecorationImage(
                image: AssetImage(cuisine.imagePath),
                fit: BoxFit.cover,
              ),
            ),
            child: Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(
                  Icons.favorite,
                  color: cuisine.isFavorite ? Colors.red : Colors.white,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          cuisine.name,
          style: const TextStyle(
              fontWeight: FontWeight.bold, fontSize: 16), // Cuisine name text
        ),
      ],
    );
  }
}

class Cuisine {
  final String name;
  final String imagePath;
  final bool isFavorite;

  Cuisine(
      {required this.name, required this.imagePath, this.isFavorite = false});
}

final cuisines = [
  Cuisine(name: 'Fried Rice', imagePath: 'assets/ham.png', isFavorite: true),
  Cuisine(
      name: 'Jollof Rice', imagePath: 'assets/burger.jpg', isFavorite: true),
  Cuisine(name: 'Pizza', imagePath: 'assets/ham.png', isFavorite: true),
  Cuisine(name: 'Burger', imagePath: 'assets/burger.jpg', isFavorite: true),
  // Add more cuisines as required
];

class RestaurantCard extends StatelessWidget {
  final Restaurant restaurant;

  const RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16.0),
              image: DecorationImage(
                image: AssetImage(restaurant.imagePath),
                fit: BoxFit.cover,
              ),
            ),
            child: Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(
                  Icons.favorite,
                  color: restaurant.isFavorite ? Colors.red : Colors.white,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          restaurant.name,
          style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16), // Restaurant name text
        ),
      ],
    );
  }
}

class Restaurant {
  final String name;
  final String imagePath;
  final bool isFavorite;

  Restaurant(
      {required this.name, required this.imagePath, this.isFavorite = false});
}

final restaurants = [
  Restaurant(
      name: 'Restaurant 1', imagePath: 'assets/ham.png', isFavorite: true),
  Restaurant(
      name: 'Restaurant 2', imagePath: 'assets/burger.jpg', isFavorite: true),
  Restaurant(
      name: 'Restaurant 3', imagePath: 'assets/ham.png', isFavorite: true),
  Restaurant(
      name: 'Restaurant 4', imagePath: 'assets/burger.jpg', isFavorite: true),
  // Add more restaurants as required
];

class ProductCard extends StatelessWidget {
  final ProductModel product;

  const ProductCard({required this.product});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16.0),
              image: DecorationImage(
                image: AssetImage(product.imagePath),
                fit: BoxFit.cover,
              ),
            ),
            child: Align(
              alignment: Alignment.topRight,
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Icon(
                  Icons.favorite,
                  color: product.isFavorite ? Colors.red : Colors.white,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          product.name,
          style: const TextStyle(
              fontWeight: FontWeight.bold, fontSize: 16), // Product name text
        ),
      ],
    );
  }
}

class ProductModel {
  final String name;
  final String imagePath;
  final bool isFavorite;

  ProductModel(
      {required this.name, required this.imagePath, this.isFavorite = false});

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      name: json['name'],
      imagePath: json['imagePath'],
      isFavorite: json['isFavorite'] ?? false,
    );
  }
}

final products = [
  ProductModel(
      name: 'Product 1', imagePath: 'assets/ham.png', isFavorite: true),
  ProductModel(
      name: 'Product 2', imagePath: 'assets/burger.jpg', isFavorite: true),
  ProductModel(
      name: 'Product 3', imagePath: 'assets/ham.png', isFavorite: true),
  ProductModel(
      name: 'Product 4', imagePath: 'assets/burger.jpg', isFavorite: true),
  // Add more products as required
];
