import 'package:flutter/material.dart';
import 'package:mobile/auths/signup_screen.dart';
import 'package:http/http.dart' as http; // Import HTTP package
import 'package:mobile/widgets/customer_nav_bar.dart';
import 'dart:convert'; // Import JSON codec
import 'package:shared_preferences/shared_preferences.dart'; // Import shared preferences
import 'package:mobile/services/endpoints.dart'; // Import endpoints
import 'forget_password_screen.dart'; // Import the new screen

class OrangePlateLogin extends StatefulWidget {
  @override
  _OrangePlateLoginState createState() => _OrangePlateLoginState();
}

class _OrangePlateLoginState extends State<OrangePlateLogin> {
  bool _isLoading = false; // State to track loading status

  // Define the controllers
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  bool _passwordVisible = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus(); // Check login status on app start
  }

  // Function to check if the user is already logged in
  Future<void> _checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    if (token != null) {
      // Navigate to the main screen if the user is already logged in
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => CustomerBottomNavBar()),
      );
    }
  }

  // Function to handle user login
  Future<void> loginUser(
      BuildContext context, String email, String password) async {
    setState(() {
      _isLoading = true; // Start loading
    });
    try {
      var response = await http.post(
        Uri.parse(loginUrl),
        body: jsonEncode({'email': email, 'password': password}),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        print('Response data: $data'); // Print the response body for debugging

        if (data != null &&
            data['loggedInUser'] != null &&
            data['token'] != null) {
          SharedPreferences prefs = await SharedPreferences.getInstance();
          await prefs.setString(
              'userId', data['loggedInUser']['id']); // Store the user ID
          await prefs.setString('userToken', data['token']); // Store the token
          // Handle successful login
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => CustomerBottomNavBar()),
          );
        } else {
          throw Exception('Invalid response data');
        }
      } else {
        throw Exception(
            'Failed to login with status code ${response.statusCode}');
      }
    } catch (e) {
      print(e.toString());

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login error: ${e.toString()}')),
      );
    } finally {
      setState(() {
        _isLoading = false; // Stop loading
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage(
                    'assets/background.jpg'), // Ensure you have this image in your assets
                fit: BoxFit.cover,
              ),
            ),
          ),
          // White Card
          Center(
            child: Container(
              padding: const EdgeInsets.all(20),
              margin: const EdgeInsets.symmetric(horizontal: 20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(15),
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Logo
                    const CircleAvatar(
                      radius: 30,
                      backgroundImage: AssetImage(
                          'assets/logo.png'), // Ensure you have this image in your assets
                    ),
                    const SizedBox(height: 10),
                    // Title
                    const Text(
                      'Sign In',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Email TextField
                    TextField(
                      controller: emailController, // Use the email controller
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Password TextField
                    TextField(
                      controller:
                          passwordController, // Use the password controller
                      obscureText: !_passwordVisible,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        border: OutlineInputBorder(),
                        suffixIcon: IconButton(
                          icon: Icon(
                            _passwordVisible
                                ? Icons.visibility
                                : Icons.visibility_off,
                          ),
                          onPressed: () {
                            setState(() {
                              _passwordVisible = !_passwordVisible;
                            });
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    // Sign In Button
                    ElevatedButton(
                      onPressed: _isLoading
                          ? null
                          : () {
                              loginUser(context, emailController.text,
                                  passwordController.text);
                            },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.orange,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50, vertical: 15),
                      ),
                      child: _isLoading
                          ? SizedBox(
                              width: 20,
                              height: 20,
                              child: CircularProgressIndicator(
                                strokeWidth: 2.0,
                                valueColor:
                                    AlwaysStoppedAnimation<Color>(Colors.white),
                              ),
                            )
                          : const Text('Sign In'),
                    ),
                    const SizedBox(height: 10),
                    // Sign Up Link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Don't have an account?",
                          style:
                              TextStyle(fontSize: 12, color: Colors.grey[700]),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => OrangePlateSignUp()),
                            );
                          },
                          child: const Text(
                            'Sign Up',
                            style:
                                TextStyle(fontSize: 12, color: Colors.orange),
                          ),
                        ),
                      ],
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => ForgetPasswordScreen()),
                        );
                      },
                      child: const Text('Forgot Password?'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
