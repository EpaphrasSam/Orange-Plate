import 'package:flutter/material.dart';
import 'package:mobile/auths/login_screen.dart';
import 'package:mobile/auths/signup_screen.dart';
import 'package:mobile/screens/cart_screen.dart';
import 'package:mobile/screens/favorite_screen.dart';
import 'package:mobile/screens/food_details_screen.dart';
import 'package:mobile/screens/home_screen.dart';
import 'package:mobile/screens/search_screen.dart';
import 'package:mobile/widgets/cutomer_nav_bar.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        // primarySwatch: createMaterialColor(tPABrandColor),
        // The global font for the app (To over write the particular font is used at the place needed)
        fontFamily: 'EBEXTRABOLD',

        scrollbarTheme: ScrollbarThemeData(
          thumbColor: MaterialStateProperty.all<Color>(Colors.black45),
          trackColor: MaterialStateProperty.all<Color>(Colors.black45),
        ),
      ),
      home: CustomerBottomNavBar(),
      // home: const SplashScreen(),
      // home: const ChatScreen(
      //   mentorEmail: 'tak@gmail.com',
      // ),
      // home: const MentorsDisplayScreen(),
    );
  }
}
