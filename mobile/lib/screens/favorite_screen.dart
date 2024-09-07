import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants/file_path.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/models/favorite_model.dart';
import 'package:mobile/screens/favorite_details_screen.dart';
import 'package:mobile/services/api_services.dart';

class FavouriteScreen extends StatefulWidget {
  const FavouriteScreen({super.key});

  @override
  State<FavouriteScreen> createState() => _FavouriteScreenState();
}

class _FavouriteScreenState extends State<FavouriteScreen> {
  late FavoriteList favoriteList;
  final ApiService apiService = ApiService();
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    favoriteList = FavoriteList(items: []); // Initialize with an empty list
    _loadFavorites();
  }

  Future<void> _loadFavorites() async {
    final prefs = await SharedPreferences.getInstance();
    final favoritesJson = prefs.getString('favorites') ?? '[]';
    setState(() {
      favoriteList = FavoriteList.fromJson(favoritesJson);
      isLoading = false;
    });
  }

  Future<void> _deleteAll() async {
    // Show confirmation dialog
    bool confirmDelete = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm Delete'),
          content: const Text('Are you sure you want to delete all favorites?'),
          actions: <Widget>[
            TextButton(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.of(context).pop(false);
              },
            ),
            TextButton(
              child: const Text('Delete'),
              onPressed: () {
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );

    // If user confirmed, proceed with deletion
    if (confirmDelete == true) {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('favorites', '[]');
      setState(() {
        favoriteList = FavoriteList(items: []);
      });
    }
  }

  Future<void> _addToCart(BuildContext context, MenuItem favoriteItem) async {
    try {
      await apiService.addToCart(favoriteItem.id, 1);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          behavior: SnackBarBehavior.floating,
          backgroundColor: Colors.green,
          content: Text(
            'Added to cart successfully',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white),
          ),
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          behavior: SnackBarBehavior.floating,
          backgroundColor: Colors.red,
          content: Text(
            'Failed to add to cart: $e',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white),
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Favourite'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        actions: [
          if (favoriteList.items.isNotEmpty)
            TextButton(
              onPressed: _deleteAll,
              child: const Text(
                'Delete All',
                style: TextStyle(color: Colors.black),
              ),
            ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : favoriteList.items.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.favorite_border,
                        size: 64,
                        color: Colors.grey,
                      ),
                      SizedBox(height: 16),
                      Text(
                        'No favorites available',
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                )
              : ListView.builder(
                  itemCount: favoriteList.items.length,
                  itemBuilder: (context, index) {
                    return FavouriteProductCard(
                      product: favoriteList.items[index].menuItem,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => FavoriteDetailsScreen(
                              favoriteItem: favoriteList.items[index].menuItem,
                            ),
                          ),
                        );
                      },
                      onAddToCart: () => _addToCart(
                          context, favoriteList.items[index].menuItem),
                    );
                  },
                ),
    );
  }
}

class FavouriteProductCard extends StatefulWidget {
  final MenuItem product;
  final VoidCallback onTap;
  final Future<void> Function() onAddToCart;

  const FavouriteProductCard({
    super.key,
    required this.product,
    required this.onTap,
    required this.onAddToCart,
  });

  @override
  _FavouriteProductCardState createState() => _FavouriteProductCardState();
}

class _FavouriteProductCardState extends State<FavouriteProductCard> {
  bool _isAddingToCart = false;
  bool _addedToCart = false;

  Future<void> _handleAddToCart() async {
    setState(() {
      _isAddingToCart = true;
    });

    try {
      await widget.onAddToCart();
      setState(() {
        _addedToCart = true;
      });

      // Reset the checkmark after 2 seconds
      await Future.delayed(const Duration(seconds: 2));
      if (mounted) {
        setState(() {
          _addedToCart = false;
        });
      }
    } finally {
      if (mounted) {
        setState(() {
          _isAddingToCart = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        child: Card(
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          clipBehavior: Clip.antiAlias,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Stack(
                children: [
                  CachedNetworkImage(
                    cacheKey: widget.product.option,
                    imageUrl: widget.product.option,
                    placeholder: (context, url) => Image.asset(placeHolderPath),
                    errorWidget: (context, url, error) =>
                        Image.asset(placeHolderPath),
                    fit: BoxFit.cover,
                    height: 150,
                    width: double.infinity,
                  ),
                  Positioned(
                    top: 10,
                    right: 10,
                    child: GestureDetector(
                      onTap: _isAddingToCart ? null : _handleAddToCart,
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: _isAddingToCart
                            ? const SizedBox(
                                width: 20,
                                height: 20,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  valueColor: AlwaysStoppedAnimation<Color>(
                                      Colors.black),
                                ),
                              )
                            : _addedToCart
                                ? const Icon(
                                    Icons.check,
                                    color: Colors.green,
                                    size: 20,
                                  )
                                : const Icon(
                                    Icons.shopping_cart,
                                    color: Colors.black,
                                    size: 20,
                                  ),
                      ),
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.all(12),
                color: Colors.orange,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.product.name,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            widget.product.description,
                            style: const TextStyle(
                              fontSize: 14,
                              color: Colors.black,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        'GH₵${widget.product.price.toStringAsFixed(2)}',
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
