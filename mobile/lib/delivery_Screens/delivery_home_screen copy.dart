import 'package:flutter/material.dart';
import 'package:mobile/delivery_Screens/available_orders_screen.dart';
import 'package:mobile/delivery_Screens/delivery_profile_screen.dart';
// import 'package:mobile/delivery_Screens/delivery_stats_screen.dart';
import 'package:mobile/delivery_Screens/delivery_statistics_screen.dart';
import 'package:mobile/delivery_Screens/earnings_statistics_screen.dart';
import 'package:mobile/functions/logout_func.dart';
import 'package:mobile/services/api_services.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class DeliveryHomeScreen extends StatefulWidget {
  const DeliveryHomeScreen({super.key});

  @override
  State<DeliveryHomeScreen> createState() => _DeliveryHomeScreenState();
}

class _DeliveryHomeScreenState extends State<DeliveryHomeScreen> {
  final ApiService _apiService = ApiService();
  Map<String, dynamic> _riderData = {};
  bool _isLoading = true;
  String _currentAddress = 'Fetching location...';

  @override
  void initState() {
    super.initState();
    _loadRiderData();
    _getCurrentAddress();
  }

  Future<void> _loadRiderData() async {
    try {
      Position position = await Geolocator.getCurrentPosition();
      Map<String, dynamic> data = await _apiService.fetchRiderHome(
        position.latitude,
        position.longitude,
      );
      setState(() {
        _riderData = data;
        _isLoading = false;
      });
    } catch (e) {
      print('Error loading rider data: $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  Future<void> _getCurrentAddress() async {
    try {
      print('Checking location permission...');
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        print('Location permission denied. Requesting permission...');
        permission = await Geolocator.requestPermission();
        if (permission == LocationPermission.denied) {
          print('Location permission denied');
          throw Exception('Location permission denied');
        }
      }

      if (permission == LocationPermission.deniedForever) {
        print('Location permissions are permanently denied');
        throw Exception('Location permissions are permanently denied');
      }

      print('Getting current position...');
      Position position = await Geolocator.getCurrentPosition();
      print('Latitude: ${position.latitude}');
      print('Longitude: ${position.longitude}');

      print('Converting coordinates to address...');
      final response = await http.get(Uri.parse(
          'https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.latitude}&lon=${position.longitude}&zoom=18&addressdetails=1'));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        setState(() {
          _currentAddress = data['display_name'] ?? 'Address not found';
        });
        print('Address set: $_currentAddress');
      } else {
        print('Failed to get address: ${response.statusCode}');
        setState(() {
          _currentAddress = 'Failed to get address';
        });
      }
    } catch (e) {
      print('Error getting address: $e');
      setState(() {
        _currentAddress = 'Unable to fetch location';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        actions: [
          IconButton(
              icon: const Icon(Icons.exit_to_app),
              onPressed: () {
                logout(context); // Call the logout function
              }),
        ],
        backgroundColor: Colors.orangeAccent,
        elevation: 0,
        // toolbarHeight: 100,
        flexibleSpace: SafeArea(
          child: Column(
            children: [
              // SizedBox(height: 20),
              Image.asset('assets/logo.png',
                  height: 40), // Replace with your logo
            ],
          ),
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: SingleChildScrollView(
                // Added SingleChildScrollView
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text(
                          'Hello, ${_riderData['rider']['name'] ?? 'Rider'}👋',
                          style: const TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const Spacer(), // This Spacer should be removed or replaced
                        const Icon(Icons.notifications, size: 30),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Icon(Icons.location_pin, color: Colors.red),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(_currentAddress),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    Card(
                      color: Colors.yellow[300],
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Row(
                          children: [
                            const Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Welcome',
                                  style: TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                SizedBox(height: 10),
                                Text(
                                  'No Delivery is Worth Risking\nYour Safety. Take Your Time\nYour Safety is Our Concern',
                                  style: TextStyle(fontSize: 14),
                                ),
                              ],
                            ),
                            const Spacer(), // This Spacer should be removed or replaced
                            Image.asset('assets/delivery.png',
                                height: 60), // Replace with your image
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    GridView.count(
                      crossAxisCount: 2,
                      shrinkWrap: true,
                      physics:
                          const NeverScrollableScrollPhysics(), // Added to prevent GridView from scrolling
                      mainAxisSpacing: 10,
                      crossAxisSpacing: 10,
                      children: [
                        _buildGridItem(Icons.delivery_dining, 'Orders'),
                        _buildGridItem(Icons.attach_money, 'Earnings'),
                        _buildGridItem(Icons.bar_chart, 'Stats'),
                        _buildGridItem(Icons.person, 'Profile'),
                      ],
                    ),
                    const SizedBox(
                        height: 20), // Added SizedBox to provide spacing
                    ElevatedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.map, color: Colors.white),
                      label: const Text('View Live Map',
                          style: TextStyle(color: Colors.white)),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        minimumSize: const Size(double.infinity, 50),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                    ),
                    // const SizedBox(height: 20),
                    // const Text('Recent Orders',
                    //     style: TextStyle(
                    //         fontSize: 18, fontWeight: FontWeight.bold)),
                    // const SizedBox(height: 10),
                    // _buildRecentOrders(),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildGridItem(IconData icon, String label) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(30),
      ),
      child: InkWell(
        onTap: () {
          switch (label) {
            case 'Orders':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => AvailableOrdersScreen()),
              );
              break;
            case 'Earnings':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => EarningsStatisticsScreen()),
              );
              break;
            case 'Stats':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => DeliveryStatsScreen()),
              );
              break;
            case 'Profile':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => DeliveryProfileScreen()),
              );
              break;
          }
        },
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 40, color: Colors.orange),
              const SizedBox(height: 10),
              Text(label, style: const TextStyle(fontSize: 16)),
            ],
          ),
        ),
      ),
    );
  }

  // Widget _buildRecentOrders() {
  //   List<dynamic> orders = _riderData['rider']['orders'] ?? [];
  //   return Column(
  //     children: orders.map((order) {
  //       return ListTile(
  //         title: Text('Order #${order['id'].substring(0, 8)}'),
  //         subtitle: Text('Status: ${order['status']}'),
  //         trailing: Text('\$${order['total'].toStringAsFixed(2)}'),
  //       );
  //     }).toList(),
  //   );
  // }
  Widget _buildRecentOrders() {
    List<dynamic> orders = _riderData['rider']['orders'] ?? [];
    return Column(
      children: orders.map((order) {
        return Card(
          elevation: 4,
          margin: EdgeInsets.symmetric(vertical: 10, horizontal: 4),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Order #${order['id'].substring(0, 8)}',
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                    _buildStatusChip(order['status']),
                  ],
                ),
                SizedBox(height: 12),
                Row(
                  children: [
                    Icon(Icons.location_on, color: Colors.grey, size: 20),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        order['delivery_address'] ?? 'Address not available',
                        style: TextStyle(color: Colors.grey[600]),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.access_time, color: Colors.grey, size: 20),
                    SizedBox(width: 8),
                    Text(
                      _formatDate(order['created_at']),
                      style: TextStyle(color: Colors.grey[600]),
                    ),
                  ],
                ),
                SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      '${order['items_count'] ?? 0} items',
                      style: TextStyle(fontWeight: FontWeight.w500),
                    ),
                    Text(
                      'GH₵ ${order['total'].toStringAsFixed(2)}',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        color: Colors.green,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      }).toList(),
    );
  }

  Widget _buildStatusChip(String status) {
    Color chipColor;
    switch (status.toLowerCase()) {
      case 'pending':
        chipColor = Colors.orange;
        break;
      case 'completed':
        chipColor = Colors.green;
        break;
      case 'cancelled':
        chipColor = Colors.red;
        break;
      default:
        chipColor = Colors.blue;
    }

    return Chip(
      label: Text(
        status,
        style: TextStyle(color: Colors.white, fontSize: 12),
      ),
      backgroundColor: chipColor,
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null) return 'Date not available';
    DateTime date = DateTime.parse(dateString);
    return '${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute}';
  }
}
