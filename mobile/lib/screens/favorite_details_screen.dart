import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:mobile/constants/file_path.dart';
import 'package:mobile/models/favorite_model.dart';
import 'package:mobile/services/api_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class FavoriteDetailsScreen extends StatefulWidget {
  final MenuItem favoriteItem;

  FavoriteDetailsScreen({super.key, required this.favoriteItem});

  @override
  State<FavoriteDetailsScreen> createState() => _FavoriteDetailsScreenState();
}

class _FavoriteDetailsScreenState extends State<FavoriteDetailsScreen> {
  final ApiService apiService = ApiService();
  bool _isAddingToCart = false;
  bool _isFavorite = true;

  Future<void> _toggleFavorite() async {
    final prefs = await SharedPreferences.getInstance();
    final favoritesJson = prefs.getString('favorites') ?? '[]';
    final favoriteList = FavoriteList.fromJson(favoritesJson);

    setState(() {
      if (_isFavorite) {
        favoriteList.removeItem(widget.favoriteItem.id);
      } else {
        favoriteList.addItem(FavoriteItem(
            id: widget.favoriteItem.id, menuItem: widget.favoriteItem));
      }
      _isFavorite = !_isFavorite;
    });

    await prefs.setString('favorites', favoriteList.toJson());

    if (!_isFavorite) {
      Navigator.of(context).pop(); // Return to the favorites list
    }
  }

  Future<void> _addToCart(BuildContext context) async {
    setState(() {
      _isAddingToCart = true;
    });

    try {
      await apiService.addToCart(widget.favoriteItem.id, 1);
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
    } finally {
      setState(() {
        _isAddingToCart = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        title: Text(widget.favoriteItem.name),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: Icon(_isFavorite ? Icons.favorite : Icons.favorite_border),
            onPressed: _toggleFavorite,
          ),
        ],
      ),
      body: Stack(
        children: [
          // Image
          Positioned.fill(
            child: CachedNetworkImage(
              cacheKey: widget.favoriteItem.option,
              imageUrl: widget.favoriteItem.option,
              placeholder: (context, url) =>
                  Image.asset(placeHolderPath, fit: BoxFit.cover),
              errorWidget: (context, url, error) =>
                  Image.asset(placeHolderPath, fit: BoxFit.cover),
              fit: BoxFit.cover,
            ),
          ),
          // Content
          SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                    height: MediaQuery.of(context).padding.top +
                        kToolbarHeight +
                        200), // Adjust this value
                Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius:
                        BorderRadius.vertical(top: Radius.circular(20)),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.favoriteItem.name,
                          style: Theme.of(context)
                              .textTheme
                              .headlineSmall
                              ?.copyWith(fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          widget.favoriteItem.description,
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                        const SizedBox(height: 16),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            _buildInfoItem(context, 'Ready in', '20min'),
                            _buildInfoItem(context, 'Ingredients', '8 needed'),
                            _buildInfoItem(context, 'Serves', '1-2 person'),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Total Price',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                Text(
                  '\GH₵${widget.favoriteItem.price.toStringAsFixed(2)}',
                  style: Theme.of(context)
                      .textTheme
                      .titleLarge
                      ?.copyWith(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            ElevatedButton(
              onPressed: _isAddingToCart ? null : () => _addToCart(context),
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                backgroundColor: Colors.orange,
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
              ),
              child: _isAddingToCart
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                      ),
                    )
                  : const Text('Add to Cart',
                      style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoItem(BuildContext context, String title, String value) {
    return Column(
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.bodySmall,
        ),
        Text(
          value,
          style: Theme.of(context)
              .textTheme
              .titleSmall
              ?.copyWith(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }
}
