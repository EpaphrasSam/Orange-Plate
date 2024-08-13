import 'package:flutter/material.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/favorite_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/search_screen.dart';

class CustomerBottomNavBar extends StatefulWidget {
  const CustomerBottomNavBar({Key? key}) : super(key: key);

  @override
  _MenteeBottomNavBarState createState() => _MenteeBottomNavBarState();
}

class _MenteeBottomNavBarState extends State<CustomerBottomNavBar> {
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
          HomePage(),
          // AboutContactScreen(),
          CuisinesScreen(),
          FavouriteScreen(),
          CartScreen()
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
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          // BottomNavigationBarItem(
          //   icon: Icon(Icons.person_pin_outlined),
          //   label: 'The TPA',
          // ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite),
            label: 'Favorites',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'Cart',
          ),
        ],
      ),
    );
  }
}
