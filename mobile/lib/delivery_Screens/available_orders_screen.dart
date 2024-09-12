import 'package:flutter/material.dart';
import 'package:mobile/functions/back_button_func.dart';
import 'package:mobile/delivery_Screens/delivery_details_screen.dart';
import 'package:mobile/services/api_services.dart';
import 'package:mobile/services/order_update_service.dart';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:url_launcher/url_launcher.dart';

class AvailableOrdersScreen extends StatefulWidget {
  @override
  State<AvailableOrdersScreen> createState() => _AvailableOrdersScreenState();
}

class _AvailableOrdersScreenState extends State<AvailableOrdersScreen> {
  final ApiService _apiService = ApiService();
  final OrderUpdateService _orderUpdateService = OrderUpdateService();
  List<Map<String, dynamic>> _orders = [];
  bool _isLoading = true;
  bool _isProcessing = false;

  @override
  void initState() {
    super.initState();
    _fetchOrders();
    _setupRiderId();
    // _setupOrderUpdateService();
  }

  Future<void> _setupRiderId() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? userId = prefs.getString('userId');
    if (userId != null) {
      await _apiService.setRiderId(userId);
    }
  }

  void _setupOrderUpdateService() async {
    await _orderUpdateService.initializeWebSocket();
    _orderUpdateService.setOrderUpdateCallback(_handleOrderUpdate);
  }

  void _handleOrderUpdate(dynamic orderData) {
    print('Received order update: $orderData');
    // Update the specific order in the list or refresh the entire list
    _fetchOrders();
  }

  Future<void> _fetchOrders() async {
    try {
      List<Map<String, dynamic>> orders = await _apiService.fetchRiderOrders();
      setState(() {
        _orders = orders;
        _isLoading = false;
      });
    } catch (e) {
      print('Error fetching orders: $e');
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
            content: Text('Failed to load orders. Please try again.')),
      );
    }
  }

  @override
  void dispose() {
    _orderUpdateService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4, // Change this to 4
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          leading: buildBackButton(context),
          title: const Text('Orders',
              style:
                  TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
          // actions: [
          //   IconButton(
          //     icon: const Icon(CupertinoIcons.map, color: Colors.blue),
          //     onPressed: () {
          //       // Handle map button press
          //     },
          //   ),
          // ],
          bottom: const TabBar(
            labelColor: Colors.blue,
            unselectedLabelColor: Colors.grey,
            indicatorColor: Colors.blue,
            indicatorWeight: 3,
            // isScrollable: true, // Add this to allow scrolling if tabs don't fit
            tabs: [
              Tab(text: 'Available'),
              Tab(text: 'Accepted'),
              Tab(text: 'On the Way'),
              Tab(text: 'History'),
            ],
          ),
        ),
        body: _isLoading
            ? const Center(child: CircularProgressIndicator(color: Colors.blue))
            : TabBarView(
                children: [
                  _buildOrdersList('available'),
                  _buildOrdersList('assigned'),
                  _buildOrdersList('on_the_way'),
                  _buildOrdersList('history'),
                ],
              ),
      ),
    );
  }

  Widget _buildOrdersList(String type) {
    List<Map<String, dynamic>> filteredOrders = _orders.where((order) {
      switch (type) {
        case 'available':
          return order['status'] == 'looking for rider';
        case 'assigned':
          return order['status'] == 'rider assigned';
        case 'on_the_way':
          return order['status'] == 'on the way';
        case 'history':
          return order['status'] == 'delivered';
        default:
          return false;
      }
    }).toList();

    if (filteredOrders.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.inbox_outlined, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text(
              'No ${type.replaceAll('_', ' ')} orders available.',
              style: TextStyle(fontSize: 18, color: Colors.grey[600]),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 16),
      itemCount: filteredOrders.length,
      itemBuilder: (context, index) {
        var order = filteredOrders[index];
        return OrderCard(
          restaurantImage: order['restaurant']['image'],
          customerPhone: order['User']['phone'],
          customerEmail: order['User']['email'],
          restaurantPhone: order['restaurant']['phone'],
          restaurantAddress: order['restaurant']['address'],
          logo: 'assets/ham.png',
          restaurant: order['restaurant']['name'] ?? 'Unknown Restaurant',
          location: order['restaurant']['address'] ?? 'Unknown Location',
          distance: '2.5 km', // You might want to calculate this
          customer: order['User']['name'] ?? 'Unknown Customer',
          customerDistance: '3.2 km', // You might want to calculate this
          orderId: order['id'] ?? '',
          total: order['total'] ?? 0.0,
          orderTime: order['orderTime'] ?? '',
          onOrderAccepted: () {
            _fetchOrders();
          },
          orderType: type,
        );
      },
    );
  }
}

class OrderCard extends StatefulWidget {
  final String logo;
  final String restaurant;
  final String location;
  final String distance;
  final String customer;
  final String customerDistance;
  final String orderId;
  final double total;
  final String orderTime;
  final Function onOrderAccepted;
  final String orderType;
  final String? restaurantImage;
  final String? customerPhone;
  final String? customerEmail;
  final String? restaurantPhone;
  final String? restaurantAddress;

  const OrderCard({
    required this.logo,
    required this.restaurant,
    required this.location,
    required this.distance,
    required this.customer,
    required this.customerDistance,
    required this.orderId,
    required this.total,
    required this.orderTime,
    required this.onOrderAccepted,
    required this.orderType,
    this.restaurantImage,
    this.customerPhone,
    this.customerEmail,
    this.restaurantPhone,
    this.restaurantAddress,
  });

  @override
  _OrderCardState createState() => _OrderCardState();
}

class _OrderCardState extends State<OrderCard> {
  final ApiService _apiService = ApiService();
  bool _isProcessing = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: widget.restaurantImage != null
                      ? Image.network(
                          widget.restaurantImage!,
                          width: 50,
                          height: 50,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) =>
                              Image.asset(widget.logo,
                                  width: 50, height: 50, fit: BoxFit.cover),
                        )
                      : Image.asset(widget.logo,
                          width: 50, height: 50, fit: BoxFit.cover),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.restaurant,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 18),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          const Icon(Icons.location_on,
                              size: 16, color: Colors.grey),
                          const SizedBox(width: 4),
                          Expanded(
                            child: Text(
                              widget.location,
                              style: const TextStyle(color: Colors.grey),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 8),
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.blue.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    widget.distance,
                    style: const TextStyle(
                        fontWeight: FontWeight.bold, color: Colors.blue),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                CircleAvatar(
                  backgroundColor: Colors.blue.withOpacity(0.1),
                  child: const Icon(Icons.person, color: Colors.blue),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.customer,
                        style: const TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 16),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.customerDistance,
                        style: const TextStyle(color: Colors.grey),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        'Total: GH₵ ${widget.total.toStringAsFixed(2)}',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 16),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 4),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        'Order Time: ${DateFormat('EEEE dd-MM-yyyy HH:mm').format(DateTime.parse(widget.orderTime))}',
                        style: TextStyle(color: Colors.grey[600], fontSize: 14),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            if (widget.restaurantPhone != null ||
                widget.restaurantAddress != null ||
                widget.customerPhone != null ||
                widget.customerEmail != null)
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      if (widget.restaurantPhone != null ||
                          widget.restaurantAddress != null)
                        _buildInfoSection(
                          'Restaurant',
                          Icons.restaurant,
                          [
                            Row(
                              children: [
                                if (widget.restaurantPhone != null)
                                  Expanded(
                                    child: _buildContactItem(
                                      Icons.phone,
                                      'Call',
                                      () =>
                                          _launchPhone(widget.restaurantPhone!),
                                    ),
                                  ),
                                if (widget.restaurantAddress != null)
                                  Expanded(
                                    child: _buildContactItem(
                                      Icons.location_on,
                                      'Address',
                                      () => _showAddressDialog(
                                          context, widget.restaurantAddress!),
                                    ),
                                  ),
                              ],
                            ),
                          ],
                        ),
                      if (widget.customerPhone != null ||
                          widget.customerEmail != null)
                        _buildInfoSection(
                          'Customer',
                          Icons.person,
                          [
                            Row(
                              children: [
                                if (widget.customerPhone != null)
                                  Expanded(
                                    child: _buildContactItem(
                                      Icons.phone,
                                      'Call',
                                      () => _launchPhone(widget.customerPhone!),
                                    ),
                                  ),
                                if (widget.customerEmail != null)
                                  Expanded(
                                    child: _buildContactItem(
                                      Icons.email,
                                      'Email',
                                      () => _launchEmail(widget.customerEmail!),
                                    ),
                                  ),
                              ],
                            ),
                          ],
                        ),
                    ],
                  ),
                ),
              ),
            Row(
              children: [
                if (widget.orderType == 'available')
                  Expanded(
                    child: ElevatedButton(
                      onPressed: _isProcessing ? null : _acceptOrder,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10),
                        ),
                      ),
                      child: _isProcessing
                          ? const SizedBox(
                              height: 20,
                              width: 20,
                              child: CircularProgressIndicator(
                                valueColor:
                                    AlwaysStoppedAnimation<Color>(Colors.white),
                                strokeWidth: 2,
                              ),
                            )
                          : const Text(
                              'Accept',
                              style: TextStyle(color: Colors.white),
                            ),
                    ),
                  ),
                if (widget.orderType == 'available') const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _isProcessing
                        ? null
                        : (widget.orderType == 'on_the_way'
                            ? _endTrip
                            : () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => DeliveryDetailsScreen(
                                      restaurant: widget.restaurant,
                                      customer: widget.customer,
                                      order: {
                                        'id': widget.orderId,
                                        'riderId': widget.customer,
                                        // Add other relevant order details here
                                      },
                                    ),
                                  ),
                                );
                              }),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: widget.orderType == 'on_the_way'
                          ? Colors.red
                          : Colors.orange,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: _isProcessing && widget.orderType == 'on_the_way'
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              valueColor:
                                  AlwaysStoppedAnimation<Color>(Colors.white),
                              strokeWidth: 2,
                            ),
                          )
                        : Text(
                            widget.orderType == 'on_the_way'
                                ? 'End Trip'
                                : 'Know more',
                            style: const TextStyle(color: Colors.white),
                          ),
                  ),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  void _acceptOrder() async {
    setState(() {
      _isProcessing = true;
    });
    try {
      print('Attempting to accept order: ${widget.orderId}');
      final result = await _apiService.acceptOrder(widget.orderId);
      print('API Response received:');
      print(json.encode(result));
      if (result['success']) {
        print('Order accepted successfully');
        print('Server message: ${result['message']}');
        _showSnackBar(
            context, result['message'] ?? 'Order accepted successfully', true);
        widget.onOrderAccepted();
      } else {
        print('Failed to accept order. Error: ${result['error']}');
        print('Status code: ${result['statusCode']}');
        _showSnackBar(context, result['error'], false);
      }
    } catch (e) {
      print('Exception occurred while accepting order: $e');
      _showSnackBar(
          context, 'An error occurred while accepting the order', false);
    } finally {
      if (mounted) {
        setState(() {
          _isProcessing = false;
        });
      }
    }
  }

  void _endTrip() async {
    setState(() {
      _isProcessing = true;
    });
    try {
      final result = await _apiService.endTrip(widget.orderId);
      if (result['success']) {
        _showSnackBar(
            context, result['message'] ?? 'Trip ended successfully', true);
        widget.onOrderAccepted(); // Refresh the orders list
      } else {
        _showSnackBar(context, result['error'], false);
      }
    } catch (e) {
      _showSnackBar(context, 'An error occurred while ending the trip', false);
    } finally {
      if (mounted) {
        setState(() {
          _isProcessing = false;
        });
      }
    }
  }

  void _showSnackBar(BuildContext context, String message, bool isSuccess) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(
          message,
          style: const TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
        ),
        behavior: SnackBarBehavior.floating,
        backgroundColor: isSuccess ? Colors.green : Colors.red,
      ),
    );
  }

  Widget _buildInfoSection(String title, IconData icon, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, size: 18, color: Colors.blue),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ...items,
      ],
    );
  }

  Widget _buildContactItem(IconData icon, String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 4.0),
        child: Row(
          children: [
            Icon(icon, size: 16, color: Colors.grey[600]),
            const SizedBox(width: 8),
            Text(
              label,
              style: TextStyle(color: Colors.grey[600]),
            ),
          ],
        ),
      ),
    );
  }

  void _launchPhone(String phoneNumber) async {
    final url = Uri.parse('tel:$phoneNumber');
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    } else {
      print('Could not launch $url');
    }
  }

  void _launchEmail(String email) async {
    final url = Uri.parse('mailto:$email');
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    } else {
      print('Could not launch $url');
    }
  }

  void _showAddressDialog(BuildContext context, String address) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Restaurant Address'),
          content: Text(address),
          actions: <Widget>[
            TextButton(
              child: const Text('Close'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}
