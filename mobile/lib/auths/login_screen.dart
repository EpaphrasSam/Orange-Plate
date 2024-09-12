import 'package:flutter/material.dart';
import 'package:mobile/auths/signup_screen.dart';
import 'package:http/http.dart' as http; // Import HTTP package
import 'package:mobile/widgets/customer_nav_bar.dart';
import 'dart:convert'; // Import JSON codec
import 'package:shared_preferences/shared_preferences.dart'; // Import shared preferences
import 'package:mobile/services/endpoints.dart'; // Import endpoints
import 'forget_password_screen.dart'; // Import the new screen
import 'package:mobile/delivery_Screens/delivery_home_screen.dart'; // Import DeliveryHomeScreen

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
  String _selectedRole = 'customer'; // Default role
  bool _isButtonEnabled = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus(); // Check login status on app start
    emailController.addListener(_updateButtonState);
    passwordController.addListener(_updateButtonState);
  }

  @override
  void dispose() {
    emailController.removeListener(_updateButtonState);
    passwordController.removeListener(_updateButtonState);
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  void _updateButtonState() {
    setState(() {
      _isButtonEnabled = _isValidEmail(emailController.text) &&
          passwordController.text.isNotEmpty;
    });
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }

  // Function to check if the user is already logged in
  Future<void> _checkLoginStatus() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('userToken');
    String? role = prefs.getString('userRole');
    if (token != null && role != null) {
      _navigateBasedOnRole(role);
    }
  }

  void _navigateBasedOnRole(String role) {
    if (role == 'rider') {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => DeliveryHomeScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => CustomerBottomNavBar()),
      );
    }
  }

  // Function to handle user login
  Future<void> loginUser(
      BuildContext context, String email, String password, String role) async {
    setState(() {
      _isLoading = true; // Start loading
    });
    try {
      // Print the URL and body
      print('Login URL: $loginUrl');
      print('Request body: ${jsonEncode({
            'email': email,
            'password': password,
            'role': role
          })}');

      var response = await http.post(
        Uri.parse(loginUrl),
        body: jsonEncode({'email': email, 'password': password, 'role': role}),
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
          await prefs.setString('userRole', role); // Store the user role

          _navigateBasedOnRole(role);
        } else {
          throw Exception('Invalid response data');
        }
      } else {
        throw Exception(
            'Failed to login with status code ${response.statusCode}');
      }
    } catch (e) {
      print('Login error: ${e.toString()}');

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
                    'assets/home.png'), // Ensure you have this image in your assets
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
                      keyboardType: TextInputType.emailAddress,
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
                    // Role selection
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Radio<String>(
                          value: 'customer',
                          groupValue: _selectedRole,
                          onChanged: (value) {
                            setState(() {
                              _selectedRole = value!;
                            });
                          },
                        ),
                        Text('Customer'),
                        Radio<String>(
                          value: 'rider',
                          groupValue: _selectedRole,
                          onChanged: (value) {
                            setState(() {
                              _selectedRole = value!;
                            });
                          },
                        ),
                        Text('Rider'),
                      ],
                    ),
                    const SizedBox(height: 20),
                    // Sign In Button
                    ElevatedButton(
                      onPressed: (_isButtonEnabled && !_isLoading)
                          ? () {
                              loginUser(
                                context,
                                emailController.text,
                                passwordController.text,
                                _selectedRole,
                              );
                            }
                          : null,
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
