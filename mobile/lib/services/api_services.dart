import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/global_state.dart';
import 'package:mobile/models/models.dart';
import 'package:mobile/models/orders_model.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart'; // Import shared preferences
import 'endpoints.dart'; // Ensure this is correctly imported
// import 'package:mobile/models/models.dart'; // This imports Product from models.dart
import 'package:mobile/models/cart_model.dart'; // This imports Product from models.dart

class ApiException implements Exception {
  final String message;
  final int statusCode;

  ApiException(this.message, this.statusCode);

  @override
  String toString() => 'ApiException: $message (Status Code: $statusCode)';
}

class ApiService {
  // final String baseUrl = 'https://yourapi.com'; // Replace with your base URL
  final GlobalState _globalState = GlobalState();
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

  Future<List<ProductModel>> fetchMenuItemsByRestaurantId(
      String restaurantId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      print('No token found');
      throw Exception('No token found');
    }

    try {
      var response = await http.get(
        Uri.parse('$getRestaurantMenuItemsUrl$restaurantId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);
        List<dynamic> menuItemsData = responseData['menuItems'];

        List<ProductModel> menuItems = menuItemsData.map((menuItemJson) {
          return ProductModel.fromJson(menuItemJson);
        }).toList();

        return menuItems;
      } else {
        print('Failed to load menu items: ${response.statusCode}');
        throw Exception('Failed to load menu items');
      }
    } catch (e) {
      print('Error fetching menu items: $e');
      throw Exception('Error fetching menu items');
    }
  }

  Future<List<RestaurantModel>> fetchAllRestaurantsWithMenuItems() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      print('No token found');
      return [];
    }

    try {
      var response = await http.get(
        Uri.parse('https://orange-plate.onrender.com/user/all-restaurants'),
      );

      print('Response status: ${response.statusCode}');
      print('Response body from all restaurants: ${response.body}');

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);
        List<dynamic> restaurantsData = responseData['restaurants'];

        List<RestaurantModel> restaurants =
            restaurantsData.map((restaurantJson) {
          return RestaurantModel.fromJson(restaurantJson);
        }).toList();

        // Print details for debugging
        for (var restaurant in restaurants) {
          restaurant.printDetails();
        }

        return restaurants;
      } else {
        print('Failed to load restaurants: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print('Error fetching restaurants: $e');
      return [];
    }
  }

  Future<List<CategoryModel>> fetchCategories() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      print('No token found');
      return [];
    }

    try {
      var response = await http.get(
        Uri.parse(getCategoriesAndMenuUrl),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        Map<String, dynamic> responseData = jsonDecode(response.body);
        List<dynamic> categoriesData = responseData['categories'];
        return categoriesData
            .map((category) => CategoryModel.fromJson(category))
            .toList();
      } else {
        print('Failed to load categories: ${response.statusCode}');
        return [];
      }
    } catch (e) {
      print('Error fetching categories: $e');
      return [];
    }
  }

  Future<Map<String, dynamic>> fecthFromAnyWhere() async {
    final String url = getNearbyRestaurantsMenuItemsUrl;
    print('Request URL: $url');

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      print('No token found');
      return {};
    }

    print('Token: $token');

    // Generate random coordinates within a reasonable range
    final random = Random();
    final latitude = (random.nextDouble() * 180) - 90; // Range: -90 to 90
    final longitude = (random.nextDouble() * 360) - 180; // Range: -180 to 180

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
        Map<String, dynamic> responseData = jsonDecode(response.body);
        return {
          'restaurantsWithoutMenuItems':
              responseData['restaurantsWithoutMenuItems'] ?? [],
          'menuItems': responseData['menuItems'] ?? [],
          'categoriesWithMenuItems':
              responseData['categoriesWithMenuItems'] ?? [],
          'search': responseData['search'] ?? [],
        };
      } else {
        print('Failed to load products: ${response.statusCode}');
        return {};
      }
    } catch (e) {
      print('Error fetching products: $e');
      return {};
    }
  }

  Future<Map<String, dynamic>> fetchProducts(
      double latitude, double longitude) async {
    final String url =
        getNearbyRestaurantsMenuItemsUrl; // Replace with your endpoint
    print('Request URL: $url'); // Print the URL

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken'); // Retrieve the token

    if (token == null) {
      print('No token found');
      return {};
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
        Map<String, dynamic> responseData = jsonDecode(response.body);
        return {
          'categories': responseData['categories'] ?? [],
          'restaurantsWithoutMenuItems':
              responseData['restaurantsWithoutMenuItems'] ?? [],
          'menuItems': responseData['menuItems'] ?? [],
        };
      } else {
        print('Failed to load products: ${response.statusCode}');
        return {};
      }
    } catch (e) {
      print('Error fetching products: $e');
      return {};
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
      double total,
      String restaurantId,
      List<String> cartItemIds,
      double customerLatitude,
      double customerLongitude) async {
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
        'Authorization': token, // Updated to use Bearer token
      },
      body: jsonEncode(<String, dynamic>{
        'total': total,
        'restaurantId': restaurantId,
        'customerLatitude': customerLatitude,
        'customerLongitude': customerLongitude,
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

// Rider API Services
  Future<Map<String, dynamic>> fetchRiderHome(
      double latitude, double longitude) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? riderId =
        prefs.getString('userId'); // Assuming rider ID is stored as userId

    if (token == null || riderId == null) {
      print('No token or rider ID found');
      throw Exception('Authentication required');
    }

    print('Token: $token'); // Debug print
    print('Rider ID: $riderId'); // Debug print
    print('Latitude: $latitude'); // Debug print
    print('Longitude: $longitude'); // Debug print

    try {
      var response = await http.post(
        Uri.parse('$getRiderHomeUrl$riderId'),
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
        print('Failed to load rider home data: ${response.statusCode}');
        throw Exception('Failed to load rider home data: ${response.body}');
      }
    } catch (e) {
      print('Error fetching rider home data: $e');
      throw Exception('Error fetching rider home data: $e');
    }
  }

  // Add this method to get the rider ID
  Future<String?> getRiderId() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('riderId');
  }

  Future<Map<String, dynamic>> acceptOrder(String orderId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? riderId = await getRiderId(); // Get the stored rider ID

    if (token == null || riderId == null) {
      return {
        'success': false,
        'statusCode': 401,
        'error': 'Authentication required or Rider ID not found',
      };
    }

    final url =
        Uri.parse('https://orange-plate.onrender.com/rider/accept-order');

    try {
      print('Accepting order: $orderId for rider: $riderId'); // Debug print
      final response = await http.post(
        url,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'orderId': orderId,
          'riderId': riderId,
        }),
      );

      // ... rest of the method remains the same ...
      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      Map<String, dynamic> responseBody = json.decode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'statusCode': response.statusCode,
          'message': responseBody['message'] ?? 'Order accepted successfully',
        };
      } else {
        String errorMessage = 'Failed to accept order';
        if (responseBody.containsKey('error')) {
          if (responseBody['error'] is Map) {
            errorMessage = responseBody['error']['message'] ?? errorMessage;
          } else {
            errorMessage = responseBody['error'] ?? errorMessage;
          }
        }
        return {
          'success': false,
          'statusCode': response.statusCode,
          'error': errorMessage,
        };
      }
    } catch (e) {
      print('Error accepting order: $e');
      return {
        'success': false,
        'statusCode': 500,
        'error': 'An error occurred while processing the request: $e',
      };
    }
  }

  Future<List<ProductModel>> fetchMenuItems(String restaurantId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');

    if (token == null) {
      throw ApiException('No token found', 401);
    }

    try {
      var response = await http.get(
        Uri.parse('$getMenuItemsUrl$restaurantId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        List<dynamic> menuItemsData = jsonDecode(response.body)['menuItems'];
        return menuItemsData
            .map((item) => ProductModel.fromJson(item))
            .toList();
      } else {
        throw ApiException('Failed to load menu items', response.statusCode);
      }
    } catch (e) {
      print('Error fetching menu items: $e');
      rethrow;
    }
  }

  Future<List<Map<String, dynamic>>> fetchRiderOrders() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? riderId = prefs.getString('userId');

    if (token == null || riderId == null) {
      throw Exception('Authentication required');
    }

    try {
      var response = await http.get(
        Uri.parse('$getRiderOrdersUrl$riderId'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        Map<String, dynamic> data = jsonDecode(response.body);
        List<dynamic> orders = data['orders'];
        return orders.cast<Map<String, dynamic>>();
      } else {
        throw Exception('Failed to load rider orders: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching rider orders: $e');
      throw Exception('Error fetching rider orders: $e');
    }
  }

  // Add this method to set the rider ID
  Future<void> setRiderId(String riderId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('riderId', riderId);
  }

  Future<Map<String, dynamic>> endTrip(String orderId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? riderId = await getRiderId();

    if (token == null || riderId == null) {
      return {
        'success': false,
        'statusCode': 401,
        'error': 'Authentication required or Rider ID not found',
      };
    }

    final url = Uri.parse('$endTripUrl$riderId');

    try {
      print('Ending trip for order: $orderId, rider: $riderId'); // Debug print
      final response = await http.post(
        url,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: json.encode({
          'orderId': orderId,
        }),
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      Map<String, dynamic> responseBody = json.decode(response.body);

      if (response.statusCode == 200) {
        return {
          'success': true,
          'statusCode': response.statusCode,
          'message': responseBody['message'] ?? 'Trip ended successfully',
        };
      } else {
        String errorMessage = 'Failed to end trip';
        if (responseBody.containsKey('error')) {
          errorMessage = responseBody['error'] is Map
              ? responseBody['error']['message'] ?? errorMessage
              : responseBody['error'] ?? errorMessage;
        }
        return {
          'success': false,
          'statusCode': response.statusCode,
          'error': errorMessage,
        };
      }
    } catch (e) {
      print('Error ending trip: $e');
      return {
        'success': false,
        'statusCode': 500,
        'error': 'An error occurred while processing the request: $e',
      };
    }
  }

  Future<List<OrderModel>> fetchUserOrders() async {
    final prefs = await SharedPreferences.getInstance();
    final userToken = prefs.getString('userToken');
    final userId = await getUserId();

    print('User ID: $userId');
    print('User Token: $userToken');

    if (userToken == null) {
      throw Exception('User token not found');
    }

    if (userId == null) {
      throw Exception('User ID not found');
    }

    try {
      final url = '$getUserOrdersUrl$userId';
      print('Fetching orders from URL: $url');

      final response = await http.get(
        Uri.parse(url),
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json',
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final List<dynamic> ordersData = data['orders'];
        print('Number of orders received: ${ordersData.length}');

        List<OrderModel> orders = [];
        for (var orderData in ordersData) {
          try {
            print('Parsing order: ${orderData['id']}');
            print('Parsing restaurant: ${orderData['restaurant']['name']}');
            if (orderData['CartItem'] != null) {
              print(
                  'Parsed ${orderData['CartItem'].length} menu items for ${orderData['restaurant']['name']}');
            } else {
              print('No CartItem data for order ${orderData['id']}');
            }
            orders.add(OrderModel.fromJson(orderData));
          } catch (e) {
            print('Error parsing order: $e');
            print('Problematic order data: $orderData');
          }
        }

        return orders;
      } else {
        throw Exception('Failed to load orders: ${response.statusCode}');
      }
    } catch (e) {
      print('Error fetching user orders: $e');
      throw Exception('Error fetching user orders: $e');
    }
  }

  Future<UserModel> fetchUserProfile() async {
    final prefs = await SharedPreferences.getInstance();
    final userToken = prefs.getString('userToken');
    final userId = await getUserId();

    if (userToken == null) {
      throw Exception('User token not found');
    }

    if (userId == null) {
      throw Exception('User ID not found');
    }

    try {
      var response = await http.get(
        Uri.parse('$getUserUserProfileUrl$userId'),
        headers: {
          'Authorization': userToken,
          'Content-Type': 'application/json',
        },
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        return UserModel.fromJson(data['user']);
      } else {
        print('Failed to load user profile: ${response.statusCode}');
        throw Exception('Failed to load user profile');
      }
    } catch (e) {
      print('Error fetching user profile: $e');
      throw Exception('Error fetching user profile');
    }
  }

  Future<void> setUserId(String userId) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('userId', userId);
    _globalState.userId = userId;
  }

  Future<String?> getUserId() async {
    if (_globalState.userId != null) {
      return _globalState.userId;
    }
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userId = prefs.getString('userId');
    if (userId != null) {
      _globalState.userId = userId;
    }
    return userId;
  }
}
