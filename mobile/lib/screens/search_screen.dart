import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants/file_path.dart';
import 'package:mobile/models/models.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/models/favorite_model.dart';
// import 'package:mobile/models/restaurant_model.dart';
import 'package:mobile/screens/restaurant_details_screen.dart';

import '../services/api_services.dart';
import '../models/cuisine_model.dart';
import './product_details_screen.dart';

class CuisinesScreen extends StatefulWidget {
  @override
  State<CuisinesScreen> createState() => _CuisinesScreenState();
}

class _CuisinesScreenState extends State<CuisinesScreen> {
  List<dynamic> restaurants = [];
  List<dynamic> menuItems = [];
  List<String> categories = ['All Categories'];
  String selectedCategory = 'All Categories';
  bool isLoading = true;
  bool isLoadingRestaurants = true;
  bool isLoadingCuisines = true;

  @override
  void initState() {
    super.initState();
    loadProducts();
  }

  void filterSearchResults(String query) {
    setState(() {
      if (query.isEmpty && selectedCategory == 'All Categories') {
        // If query is empty and all categories are selected, show all items
        loadProducts(); // Reset to original list
      } else {
        menuItems = menuItems.where((item) {
          bool matchesQuery = item['name']
                  .toLowerCase()
                  .contains(query.toLowerCase()) ||
              item['description'].toLowerCase().contains(query.toLowerCase());
          bool matchesCategory = selectedCategory == 'All Categories' ||
              item['categoryName'] == selectedCategory;
          return matchesQuery && matchesCategory;
        }).toList();
      }
    });
  }

  List<dynamic> originalMenuItems = []; // Add this at the class level

  Future<void> loadProducts() async {
    final apiService = ApiService();
    final productsData = await apiService.fecthFromAnyWhere();

    setState(() {
      restaurants = productsData['search'] ?? [];
      isLoadingRestaurants = false;

      originalMenuItems =
          (productsData['categoriesWithMenuItems'] as List<dynamic>)
              .expand((category) =>
                  (category['MenuItem'] as List<dynamic>).map((item) => {
                        ...item,
                        'categoryName': category['name'],
                      }))
              .toList();
      menuItems = List.from(originalMenuItems); // Create a copy for filtering

      categories = [
        'All Categories',
        ...(productsData['categoriesWithMenuItems'] as List<dynamic>)
            .map((category) => category['name'] as String)
            .toList()
      ];

      isLoadingCuisines = false;
      isLoading = false;
    });
  }

  void resetSearch() {
    setState(() {
      menuItems = List.from(originalMenuItems);
      selectedCategory = 'All Categories';
    });
  }

  Widget _buildMenuItemsSection() {
    if (menuItems.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Text(
            'No items found for the selected category: $selectedCategory',
            style: const TextStyle(fontSize: 16, fontStyle: FontStyle.italic),
            textAlign: TextAlign.center,
          ),
        ),
      );
    } else {
      return GridView.builder(
        shrinkWrap: true,
        physics: const NeverScrollableScrollPhysics(),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          childAspectRatio: 0.75,
          crossAxisSpacing: 10,
          mainAxisSpacing: 10,
        ),
        itemCount: menuItems.length,
        itemBuilder: (context, index) {
          final menuItem = menuItems[index];
          final cuisine = Cuisine(
            // restaurantName: menuItem['restaurantName'],
            id: menuItem['id'],
            name: menuItem['name'],
            description: menuItem['description'],
            price: menuItem['price'].toDouble(),
            imageUrl:
                'assets/default_food.jpg', // You might want to add an image field in your API
          );
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProductDetailsScreen(
                    product: ProductModel(
                      // restaurantName: cuisine.name,
                      id: cuisine.id,
                      name: cuisine.name,
                      description: cuisine.description,
                      price: cuisine.price,
                      image: cuisine.imageUrl,
                      option: '',
                      available: true,
                      createdAt: DateTime.now().toString(),
                      restaurantId: '',
                      categoryId: '',
                      // isFavorite: false,
                    ),
                  ),
                ),
              );
            },
            child: CuisineCard(cuisine: cuisine),
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cuisines'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        centerTitle: true,
        actions: [
          PopupMenuButton<String>(
            icon: const Icon(Icons.more_vert),
            onSelected: (String result) {
              setState(() {
                selectedCategory = result;
                filterSearchResults(''); // Apply filter with empty search query
              });
            },
            itemBuilder: (BuildContext context) => categories
                .map((String category) => PopupMenuItem<String>(
                      value: category,
                      child: Text(category),
                    ))
                .toList(),
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    TextField(
                      decoration: InputDecoration(
                        hintText: 'Search for restaurants, dishes...',
                        prefixIcon: const Icon(Icons.search),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      onChanged: (value) {
                        filterSearchResults(value);
                      },
                    ),
                    const SizedBox(height: 20),
                    const Text(
                      'Restaurants',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    isLoadingRestaurants
                        ? const Center(child: CircularProgressIndicator())
                        : SizedBox(
                            height: 100, // Adjust this height as needed
                            child: ListView.builder(
                              scrollDirection: Axis.horizontal,
                              itemCount: restaurants.length,
                              itemBuilder: (context, index) {
                                final restaurant = RestaurantModel.fromJson(
                                    restaurants[index]);
                                return GestureDetector(
                                  onTap: () {
                                    Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                        builder: (context) =>
                                            RestaurantDetailsScreen(
                                                restaurant: restaurant),
                                      ),
                                    );
                                  },
                                  child: Container(
                                    width: 200, // Adjust width as needed
                                    margin: const EdgeInsets.only(right: 10),
                                    child: Card(
                                      elevation: 2,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(12.0),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.center,
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Row(
                                              children: [
                                                CircleAvatar(
                                                  backgroundColor: Colors.amber,
                                                  child: Text(
                                                    restaurant.name
                                                        .substring(0, 2)
                                                        .toUpperCase(),
                                                    style: const TextStyle(
                                                        color: Colors.white),
                                                  ),
                                                ),
                                                const SizedBox(width: 10),
                                                Expanded(
                                                  child: Column(
                                                    crossAxisAlignment:
                                                        CrossAxisAlignment
                                                            .start,
                                                    children: [
                                                      Text(
                                                        restaurant.name,
                                                        style: const TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          fontSize: 16,
                                                        ),
                                                        maxLines: 1,
                                                        overflow: TextOverflow
                                                            .ellipsis,
                                                      ),
                                                      const SizedBox(height: 4),
                                                      Row(
                                                        children: List.generate(
                                                          5,
                                                          (index) => const Icon(
                                                            Icons.star,
                                                            size: 16,
                                                            color: Colors.amber,
                                                          ),
                                                        ),
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                );
                              },
                            ),
                          ),
                    const SizedBox(height: 20),
                    const Text(
                      'Cuisines',
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    isLoadingCuisines
                        ? const Center(child: CircularProgressIndicator())
                        : _buildMenuItemsSection(),
                  ],
                ),
              ),
            ),
    );
  }
}

class CategorySection extends StatelessWidget {
  final Map<String, dynamic> category;

  const CategorySection({Key? key, required this.category}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          category['name'],
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        Container(
          height: 200,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: category['MenuItem'].length,
            itemBuilder: (context, index) {
              final menuItem = category['MenuItem'][index];
              return CuisineCard(
                cuisine: Cuisine(
                  // restaurantName: menuItem['restaurantName'],
                  id: menuItem['id'],
                  name: menuItem['name'],
                  description: menuItem['description'],
                  price: menuItem['price'].toDouble(),
                  imageUrl: category['image'],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}

class Restaurant {
  final String name;
  final double rating;
  final String imageUrl;
  final String cuisine;
  final String deliveryTime;

  Restaurant({
    required this.name,
    required this.rating,
    required this.imageUrl,
    required this.cuisine,
    required this.deliveryTime,
  });
}

class Cuisine {
  final String id;
  final String name;
  final String description;
  final double price;
  final String imageUrl;
  // final String restaurantName;
  Cuisine({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    // required this.restaurantName,
  });
}

// import 'package:flutter/material.dart';
class RestaurantCard extends StatelessWidget {
  final Restaurant restaurant;

  const RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      margin: const EdgeInsets.only(right: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(8),
            child: Image.network(
              restaurant.imageUrl,
              height: 120,
              width: 200,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            restaurant.name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
          Text(restaurant.cuisine),
          Row(
            children: [
              const Icon(Icons.star, color: Colors.yellow, size: 16),
              Text('${restaurant.rating}'),
              const Spacer(),
              Text(restaurant.deliveryTime),
            ],
          ),
        ],
      ),
    );
  }
}

class CuisineCard extends StatefulWidget {
  final Cuisine cuisine;

  const CuisineCard({required this.cuisine});

  @override
  _CuisineCardState createState() => _CuisineCardState();
}

class _CuisineCardState extends State<CuisineCard> {
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
      _isFavorite = favoriteList.contains(widget.cuisine.id);
    });
  }

  Future<void> _toggleFavorite() async {
    final prefs = await SharedPreferences.getInstance();
    final favoritesJson = prefs.getString('favorites') ?? '[]';
    final favoriteList = FavoriteList.fromJson(favoritesJson);

    setState(() {
      if (_isFavorite) {
        favoriteList.removeItem(widget.cuisine.id);
      } else {
        favoriteList.addItem(FavoriteItem(
          id: widget.cuisine.id,
          menuItem: MenuItem(
            id: widget.cuisine.id,
            name: widget.cuisine.name,
            price: widget.cuisine.price,
            option: widget.cuisine.imageUrl,
            description: widget.cuisine.description,
            available: true,
            createdAt: DateTime.now().toIso8601String(),
            restaurantId:
                '', // You might want to add this to your Cuisine model
            categoryId: '', // You might want to add this to your Cuisine model
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
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius:
                    const BorderRadius.vertical(top: Radius.circular(10)),
                child: CachedNetworkImage(
                  imageUrl: widget.cuisine.imageUrl,
                  width: double.infinity,
                  placeholder: (context, url) =>
                      const CircularProgressIndicator(),
                  errorWidget: (context, url, error) => Image.asset(
                    placeHolderPath,
                    width: double.infinity,
                    height: 100,
                    fit: BoxFit.cover,
                  ),
                  height: 100,
                  fit: BoxFit.cover,
                ),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: GestureDetector(
                  onTap: _toggleFavorite,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: const BoxDecoration(
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
          Expanded(
            // Ensure the orange container takes up the remaining space
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.orange, // Set the background color to orange
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(10),
                  bottomRight: Radius.circular(10),
                ), // Curved border and bottom edges
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      widget.cuisine.name,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 5),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            widget.cuisine.price.toString(),
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ],
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
