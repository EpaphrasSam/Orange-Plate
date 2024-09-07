import 'package:flutter/foundation.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart'; // Import shared preferences
import 'endpoints.dart'; // Ensure this is correctly imported
import 'package:mobile/models/models.dart'; // This imports Product from models.dart

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
        'Authorization': 'Bearer $token' // Use the token here
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
          'Authorization': 'Bearer $token',
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
}
