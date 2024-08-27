import 'package:flutter/material.dart';
import 'package:mobile/delivery_Screens/available_orders_screen.dart';
import 'package:mobile/delivery_Screens/delivery_client_details_screen.dart';
import 'package:mobile/delivery_Screens/delivery_details_screen.dart';
import 'package:mobile/delivery_Screens/delivery_home_screen.dart';
import 'package:mobile/delivery_Screens/delivery_success_screen.dart';
import 'package:mobile/delivery_Screens/pickup_details_screen.dart';
import 'package:mobile/delivery_Screens/pickup_screen.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/favorite_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/search_screen.dart';

class DeliveryBottomNavBar extends StatefulWidget {
  const DeliveryBottomNavBar({Key? key}) : super(key: key);

  @override
  _DeliveryBottomNavBarState createState() => _DeliveryBottomNavBarState();
}

class _DeliveryBottomNavBarState extends State<DeliveryBottomNavBar> {
  int _selectedIndex = 0;
  final PageController _pageController = PageController();

  void _navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
    _pageController.animateToPage(
      index,
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: PageView(
        controller: _pageController,
        onPageChanged: (index) => setState(() => _selectedIndex = index),
        children: [
          DeliveryHomeScreen(),
          AvailableOrdersScreen(),
          PickupDetailsScreen(),
          DeliveryDetailsScreen(),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.black,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.white,
        currentIndex: _selectedIndex,
        onTap: _navigateBottomBar,
        type: BottomNavigationBarType.fixed,
        showSelectedLabels: true,
        showUnselectedLabels: true,
        selectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.bold,
        ),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.delivery_dining),
            label: 'Available Orders',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.delivery_dining),
            label: 'Pickup Details',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.delivery_dining),
            label: 'Pickup',
          ),
        ],
      ),
    );
  }
}
