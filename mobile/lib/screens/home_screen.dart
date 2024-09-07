import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants/file_path.dart';
import 'package:mobile/functions/logout_func.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/services/api_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobile/services/endpoints.dart'; // Import endpoints
import 'dart:convert'; // Import JSON codec
import 'package:http/http.dart' as http; // Import HTTP package
import 'package:mobile/screens/product_details_screen.dart';
import 'package:mobile/models/favorite_model.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<ProductModel> products = [];
  bool isLoading = false;

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
    setState(() {
      isLoading = true;
    });

    Position position = await _determinePosition();
    double latitude = position.latitude;
    double longitude = position.longitude;

    print('Coordinates: Latitude = $latitude, Longitude = $longitude');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      print('Error: No token found');
      return;
    }

    print('Retrieved Token: $token');

    try {
      var response = await http.post(
        Uri.parse(getNearbyRestaurantsMenuItemsUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: jsonEncode({
          'latitude': latitude,
          'longitude': longitude,
        }),
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        var responseData = jsonDecode(response.body);
        print('Response data: $responseData');

        if (responseData != null && responseData['menuItems'] is List) {
          List<dynamic> menuItems = responseData['menuItems'];
          List<ProductModel> fetchedProducts = [];

          for (var restaurantMenu in menuItems) {
            if (restaurantMenu is List) {
              for (var item in restaurantMenu) {
                if (item is Map<String, dynamic>) {
                  try {
                    fetchedProducts.add(ProductModel.fromJson(item));
                  } catch (e) {
                    print('Error parsing product: $e');
                    print('Problematic item: $item');
                  }
                } else {
                  print('Unexpected item type: ${item.runtimeType}');
                }
              }
            } else {
              print(
                  'Unexpected restaurant menu type: ${restaurantMenu.runtimeType}');
            }
          }

          setState(() {
            products = fetchedProducts;
            print('Number of products: ${products.length}');
            print(
                'First product: ${products.isNotEmpty ? products.first : "No products"}');
          });
        } else {
          print('Error: menuItems are not of type List');
          print('menuItems type: ${responseData['menuItems'].runtimeType}');
        }
      } else {
        print(
            'Failed to fetch products with status code ${response.statusCode}');
      }
    } catch (e) {
      print('Failed to fetch products: $e');
    } finally {
      setState(() {
        isLoading = false;
      });
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
            // Removed Cuisines Section

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
                  if (isLoading)
                    const Center(child: CircularProgressIndicator())
                  else if (products.isEmpty)
                    const Center(child: Text('No products available'))
                  else
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.7, // Adjusted for better fit
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

class ProductCard extends StatefulWidget {
  final ProductModel product;

  const ProductCard({required this.product});

  @override
  _ProductCardState createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  bool _isFavorite = false;
  late FavoriteList favoriteList;

  @override
  void initState() {
    super.initState();
    favoriteList = FavoriteList(items: []); // Initialize with an empty list
    _checkFavoriteStatus();
  }

  Future<void> _checkFavoriteStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final favoritesJson = prefs.getString('favorites') ?? '[]';
    favoriteList = FavoriteList.fromJson(favoritesJson);
    setState(() {
      _isFavorite = favoriteList.contains(widget.product.id);
    });
  }

  Future<void> _toggleFavorite() async {
    final prefs = await SharedPreferences.getInstance();
    final favoritesJson = prefs.getString('favorites') ?? '[]';
    final favoriteList = FavoriteList.fromJson(favoritesJson);

    setState(() {
      if (_isFavorite) {
        favoriteList.removeItem(widget.product.id);
      } else {
        favoriteList.addItem(FavoriteItem(
          id: widget.product.id,
          menuItem: MenuItem(
            id: widget.product.id,
            name: widget.product.name,
            price: widget.product.price,
            option: widget.product.imagePath,
            description: widget.product.description,
            available: true,
            createdAt: DateTime.now().toIso8601String(),
            restaurantId: '',
            categoryId: '',
          ),
        ));
      }
      _isFavorite = !_isFavorite;
    });

    await prefs.setString('favorites', favoriteList.toJson());
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          ProductDetailsScreen(product: widget.product),
                    ),
                  );
                },
                child: ClipRRect(
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(16)),
                  child: CachedNetworkImage(
                    cacheKey: widget.product.imagePath,
                    imageUrl: widget.product.imagePath,
                    placeholder: (context, url) => Image.asset(placeHolderPath),
                    errorWidget: (context, url, error) =>
                        Image.asset(placeHolderPath),
                    fit: BoxFit.cover,
                    height: 120,
                    width: double.infinity,
                  ),
                ),
              ),
              Positioned(
                top: 8,
                right: 8,
                child: GestureDetector(
                  onTap: _toggleFavorite,
                  child: Icon(
                    _isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: _isFavorite ? Colors.red : Colors.grey,
                    size: 28,
                  ),
                ),
              ),
            ],
          ),
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) =>
                        ProductDetailsScreen(product: widget.product)),
              );
            },
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      widget.product.name.toUpperCase(),
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '\GH₵${widget.product.price.toStringAsFixed(2)}',
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// class ProductModel {
//   final String id;
//   final String name;
//   final double price;
//   final String option;
//   final String description;
//   final bool available;
//   final String createdAt;
//   final String restaurantId;
//   final String categoryId;
//   final String imagePath;
//   final bool isFavorite;

//   ProductModel({
//     required this.id,
//     required this.name,
//     required this.price,
//     required this.option,
//     required this.description,
//     required this.available,
//     required this.createdAt,
//     required this.restaurantId,
//     required this.categoryId,
//     required this.imagePath,
//     required this.isFavorite,
//   });

//   factory ProductModel.fromJson(Map<String, dynamic> json) {
//     return ProductModel(
//       id: json['id'] as String? ?? '',
//       name: json['name'] as String? ?? '',
//       price: (json['price'] as num?)?.toDouble() ?? 0.0,
//       option: json['option'] as String? ?? '',
//       description: json['description'] as String? ?? '',
//       available: json['available'] as bool? ?? false,
//       createdAt: json['createdAt'] as String? ?? '',
//       restaurantId: json['restaurantId'] as String? ?? '',
//       categoryId: json['categoryId'] as String? ?? '',
//       imagePath: json['imagePath'] as String? ?? 'assets/default_image.png',
//       isFavorite: json['isFavorite'] as bool? ?? false,
//     );
//   }
// }

final products = []; // Removed hardcoded products
