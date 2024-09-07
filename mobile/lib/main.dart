import 'package:flutter/material.dart';
import 'package:mobile/auths/login_screen.dart';
import 'package:mobile/auths/signup_screen.dart';
import 'package:mobile/delivery_Screens/available_orders_screen.dart';
import 'package:mobile/delivery_Screens/delivery_home_screen.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/favorite_screen.dart';
import 'package:mobile/screens/food_details_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/search_screen.dart';
import 'package:mobile/widgets/customer_nav_bar.dart';
// import 'package:mobile/widgets/cutomer_nav_bar.dart';
import 'package:mobile/widgets/delivery_nav_bar.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences prefs = await SharedPreferences.getInstance();
  bool isLoggedIn = prefs.getBool('isLoggedIn') ?? false;

  runApp(MyApp(isLoggedIn: isLoggedIn));
}

class MyApp extends StatelessWidget {
  final bool isLoggedIn;

  MyApp({required this.isLoggedIn});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: isLoggedIn ? CustomerBottomNavBar() : OrangePlateLogin(),
    );
  }
}
