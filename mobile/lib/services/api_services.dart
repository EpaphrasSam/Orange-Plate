import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/screens/cart_screen.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart'; // Import shared preferences
import 'endpoints.dart'; // Ensure this is correctly imported
// import 'package:mobile/models/models.dart'; // This imports Product from models.dart
import 'package:mobile/models/cart_model.dart'; // This imports Product from models.dart

class ApiService {
  // final String baseUrl = 'https://yourapi.com'; // Replace with your base URL

  Future<void> postUserCoordinates(Position position) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken'); // Retrieve the token

    if (token == null) {
      if (kDebugMode) {
        print('No token found');
      }
      return;
    }

    var response = await http.post(
      Uri.parse(getNearbyRestaurantsMenuItemsUrl),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token // Use the token here
      },
      body: jsonEncode({
        'latitude': position.latitude,
        'longitude': position.longitude,
      }),
    );

    if (response.statusCode == 200) {
      if (kDebugMode) {
        print('Success: ${response.body}');
      }
    } else {
      if (kDebugMode) {
        print('Failed to post coordinates: ${response.statusCode}');
      }
    }
  }

  Future<List<dynamic>> fetchProducts(double latitude, double longitude) async {
    final String url =
        getNearbyRestaurantsMenuItemsUrl; // Replace with your endpoint
    print('Request URL: $url'); // Print the URL

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken'); // Retrieve the token

    if (token == null) {
      print('No token found');
      return [];
    }

    print('Token: $token'); // Print the token for debugging

    try {
      var response = await http.post(
        Uri.parse(url),
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
        return jsonDecode(response.body);
      } else {
        print('Failed to load products: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print('Error fetching products: $e');
      return [];
    }
  }

  Future<void> addToCart(String menuItemId, int quantity) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? userId = prefs.getString('userId');

    if (token == null || userId == null) {
      if (kDebugMode) {
        print('No token or userId found');
      }
      throw Exception('Authentication required');
    }

    try {
      var response = await http.post(
        Uri.parse('$postAddToCartUrl$userId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: jsonEncode({
          'menuItemId': menuItemId,
          'quantity': quantity,
        }),
      );

      if (response.statusCode == 200) {
        if (kDebugMode) {
          print('Successfully added to cart: ${response.body}');
        }
      } else {
        if (kDebugMode) {
          print('Failed to add to cart: ${response.statusCode}');
          print('Response body: ${response.body}');
        }
        throw Exception('Failed to add to cart');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error adding to cart: $e');
      }
      throw Exception('Error adding to cart');
    }
  }

  Future<List<CartProduct>> fetchCartItems() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? userId = prefs.getString('userId');

    print("Token: $token"); // Debug print
    print("UserId: $userId"); // Debug print

    if (token == null || userId == null) {
      print('No token or userId found'); // Debug print
      throw Exception('Authentication required');
    }

    try {
      print("Sending request to: $getCartItemsUrl$userId"); // Debug print
      var response = await http.get(
        Uri.parse('$getCartItemsUrl$userId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      print("Response status: ${response.statusCode}"); // Debug print
      print("Response body: ${response.body}"); // Debug print

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);

        // Check if the response contains a 'cartItems' key
        if (responseData.containsKey('cartItems')) {
          List<dynamic> cartData = responseData['cartItems'];
          return cartData.map((item) => CartProduct.fromJson(item)).toList();
        } else {
          print('Response does not contain cartItems'); // Debug print
          return []; // Return an empty list if there are no cart items
        }
      } else {
        print(
            'Failed to fetch cart items: ${response.statusCode}'); // Debug print
        print('Response body: ${response.body}'); // Debug print
        throw Exception('Failed to fetch cart items');
      }
    } catch (e) {
      print('Error fetching cart items: $e'); // Debug print
      throw Exception('Error fetching cart items');
    }
  }

  Future<void> checkout(
      double total, String restaurantId, List<String> cartItemIds) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? userId = prefs.getString('userId');

    if (token == null || userId == null) {
      throw Exception('Authentication required');
    }

    final url = Uri.parse('$placeOrderUrl$userId');
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token,
      },
      body: jsonEncode(<String, dynamic>{
        'total': total,
        'restaurantId': restaurantId,
        'cartItems': cartItemIds,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to checkout');
    }
  }

  Future<void> editCartItemQuantity(String cartItemId, int newQuantity) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      if (kDebugMode) {
        print('No token found');
      }
      throw Exception('Authentication required');
    }

    try {
      var response = await http.put(
        Uri.parse('$editCartItemUrl$cartItemId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: jsonEncode({
          'quantity': newQuantity,
        }),
      );

      if (response.statusCode == 200) {
        if (kDebugMode) {
          print('Successfully updated cart item quantity');
        }
      } else {
        if (kDebugMode) {
          print('Failed to update cart item quantity: ${response.statusCode}');
          print('Response body: ${response.body}');
        }
        throw Exception('Failed to update cart item quantity');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error updating cart item quantity: $e');
      }
      throw Exception('Error updating cart item quantity');
    }
  }

  Future<void> deleteCartItem(String cartItemId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      if (kDebugMode) {
        print('No token found');
      }
      throw Exception('Authentication required');
    }

    try {
      var response = await http.delete(
        Uri.parse('$deleteCartItemUrl$cartItemId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      if (response.statusCode == 200) {
        if (kDebugMode) {
          print('Successfully deleted cart item');
        }
      } else {
        if (kDebugMode) {
          print('Failed to delete cart item: ${response.statusCode}');
          print('Response body: ${response.body}');
        }
        throw Exception('Failed to delete cart item');
      }
    } catch (e) {
      if (kDebugMode) {
        print('Error deleting cart item: $e');
      }
      throw Exception('Error deleting cart item');
    }
  }
}
