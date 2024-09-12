import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants/file_path.dart';
import 'package:mobile/functions/logout_func.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/services/api_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';
import 'package:mobile/services/endpoints.dart'; // Import endpoints
import 'dart:convert'; // Import JSON codec
import 'package:http/http.dart' as http; // Import HTTP package
import 'package:mobile/screens/product_details_screen.dart';
import 'package:mobile/models/favorite_model.dart';
import 'package:mobile/services/order_update_service.dart';
import 'package:mobile/screens/category_details_screen.dart'; // Create this file
import 'package:mobile/screens/restaurant_details_screen.dart'; // Create this file
import 'package:mobile/models/models.dart' show CategoryModel;

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<ProductModel> products = [];
  List<CategoryModel> categories = [];
  List<RestaurantModel> restaurants = [];
  bool isLoading = false;
  bool isCategoriesLoading = true; // New loading state for categories
  late OrderUpdateService _orderUpdateService;
  List<Map<String, dynamic>> rawCategories = [];
  bool isRestaurantsLoading = true;

  @override
  void initState() {
    super.initState();
    _orderUpdateService = OrderUpdateService();
    _initializeOrderUpdates();
    _checkLocationServicesAndFetchData();
    fetchCategories();
    printStoredUserData();
    fetchRestaurants();
  }

  void _initializeOrderUpdates() async {
    // await _orderUpdateService.initializeWebSocket();
    _orderUpdateService.setOrderUpdateCallback(_handleOrderUpdate);
  }

  void _handleOrderUpdate(dynamic message) {
    // Handle the order update here
    // You might want to parse the message and update your UI
    setState(() {
      // Update your UI based on the order status
    });
  }

  void _checkLocationServicesAndFetchData() async {
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

    fetchData();
    print('Raw Categories: $rawCategories');
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

  Future<void> fetchCategories() async {
    setState(() {
      isCategoriesLoading = true;
    });

    try {
      var apiService = ApiService();
      List<CategoryModel> fetchedCategories =
          await apiService.fetchCategories();

      setState(() {
        categories = fetchedCategories;
        isCategoriesLoading = false;
      });
    } catch (e) {
      print('Failed to fetch categories: $e');
      setState(() {
        isCategoriesLoading = false;
      });
    }
  }

  // Modify the existing fetchData method
  void fetchData() async {
    setState(() {
      isLoading = true;
    });

    Position position = await _determinePosition();
    double latitude = position.latitude;
    double longitude = position.longitude;

    try {
      var apiService = ApiService();
      var responseData = await apiService.fetchProducts(latitude, longitude);

      setState(() {
        restaurants = (responseData['restaurantsWithoutMenuItems'] as List?)
                ?.map((item) => RestaurantModel.fromJson(item))
                .toList() ??
            [];
        products = (responseData['menuItems'] as List?)
                ?.map((item) => ProductModel.fromJson(item))
                .toList() ??
            [];
        isLoading = false;
      });

      print('Restaurants: $restaurants');
      print('Products: $products');
    } catch (e) {
      print('Failed to fetch data: $e');
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

  Future<void> fetchRestaurants() async {
    setState(() {
      isRestaurantsLoading = true;
    });
    try {
      restaurants = await ApiService().fetchAllRestaurantsWithMenuItems();
      setState(() {
        isRestaurantsLoading = false;
      });
      // Debug print
      for (var restaurant in restaurants) {
        print('${restaurant.name}: ${restaurant.menuItems.length} menu items');
      }
    } catch (e) {
      print('Failed to fetch restaurants: $e');
      setState(() {
        isRestaurantsLoading = false;
      });
    }
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
            Text('Hello, Customer!'),
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
                    image: AssetImage('assets/burger.jpg'),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),

            // Categories
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Categories',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  if (isCategoriesLoading)
                    const Center(child: CircularProgressIndicator())
                  else if (categories.isEmpty)
                    const Center(child: Text('No categories available'))
                  else
                    SizedBox(
                      height: 90,
                      child: ListView.builder(
                        scrollDirection: Axis.horizontal,
                        itemCount: categories.length,
                        itemBuilder: (context, index) {
                          final category = categories[index];
                          return GestureDetector(
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      CategoryDetailsScreen(category: category),
                                ),
                              );
                            },
                            child: Container(
                              width: 70,
                              margin: const EdgeInsets.only(right: 10),
                              child: Column(
                                children: [
                                  ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: CachedNetworkImage(
                                      imageUrl: category.image,
                                      placeholder: (context, url) =>
                                          Image.asset(placeHolderPath),
                                      errorWidget: (context, url, error) =>
                                          Image.asset(placeHolderPath),
                                      width: 60,
                                      height: 60,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Expanded(
                                    child: Text(
                                      category.name,
                                      style: TextStyle(fontSize: 11),
                                      textAlign: TextAlign.center,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),

            // Restaurants
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Restaurants Near You',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  if (isRestaurantsLoading)
                    const Center(child: CircularProgressIndicator())
                  else if (restaurants.isEmpty)
                    const Center(child: Text('No restaurants available'))
                  else
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.8,
                        crossAxisSpacing: 10,
                        mainAxisSpacing: 10,
                      ),
                      itemCount: restaurants.length,
                      itemBuilder: (context, index) {
                        return RestaurantCard(
                          restaurant: restaurants[index],
                        );
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
                  const Text('Menu Items Near You',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
                  const SizedBox(height: 8),
                  if (isLoading)
                    const Center(child: CircularProgressIndicator())
                  else if (products.isEmpty)
                    const Center(
                        child: Text('No menu items available near you'))
                  else
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        childAspectRatio: 0.7,
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

  @override
  void dispose() {
    _orderUpdateService.dispose();
    super.dispose();
  }
}

class CategoryIcon extends StatelessWidget {
  final IconData icon;
  final String label;
  final String imageUrl;

  const CategoryIcon(
      {required this.icon, required this.label, required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(right: 16),
      child: Column(
        children: [
          Container(
            width: 60,
            height: 60,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              image: DecorationImage(
                image: NetworkImage(imageUrl),
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
    );
  }
}

class RestaurantCard extends StatelessWidget {
  final RestaurantModel restaurant;

  const RestaurantCard({
    Key? key,
    required this.restaurant,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => RestaurantDetailsScreen(
              restaurant: restaurant,
            ),
          ),
        );
      },
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(16)),
              child: AspectRatio(
                aspectRatio: 16 / 9,
                child: CachedNetworkImage(
                  imageUrl: restaurant.image.toString(),
                  placeholder: (context, url) =>
                      Image.asset(restaurantPlaceholderPath),
                  errorWidget: (context, url, error) =>
                      Image.asset(restaurantPlaceholderPath),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    restaurant.name,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 16),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    restaurant.address,
                    style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
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
    favoriteList = FavoriteList(items: []);
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
            option: widget.product.image ?? '',
            description: widget.product.description,
            available: true,
            createdAt: DateTime.now().toIso8601String(),
            restaurantId: widget.product.restaurantId,
            categoryId: widget.product.categoryId,
          ),
        ));
      }
      _isFavorite = !_isFavorite;
    });

    await prefs.setString('favorites', favoriteList.toJson());
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ProductDetailsScreen(
              product: widget.product,
            ),
          ),
        );
      },
      child: Card(
        elevation: 4,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Stack(
              children: [
                ClipRRect(
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(16)),
                  child: CachedNetworkImage(
                    cacheKey: widget.product.image ?? '',
                    imageUrl: widget.product.image ?? '',
                    placeholder: (context, url) => Image.asset(placeHolderPath),
                    errorWidget: (context, url, error) =>
                        Image.asset(placeHolderPath),
                    fit: BoxFit.cover,
                    height: 120,
                    width: double.infinity,
                  ),
                ),
                Positioned(
                  top: 8,
                  right: 8,
                  child: GestureDetector(
                    onTap: _toggleFavorite,
                    child: Container(
                      padding: EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        _isFavorite ? Icons.favorite : Icons.favorite_border,
                        color: Colors.red,
                        size: 20,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
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
          ],
        ),
      ),
    );
  }
}
