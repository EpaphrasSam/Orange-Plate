import 'package:flutter/material.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:mobile/auths/login_screen.dart';
import 'package:mobile/services/endpoints.dart'; // Import endpoints
import 'package:http/http.dart' as http;
import 'package:mobile/widgets/customer_nav_bar.dart';
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class OrangePlateSignUp extends StatefulWidget {
  OrangePlateSignUp({super.key});

  @override
  State<OrangePlateSignUp> createState() => _OrangePlateSignUpState();
}

class _OrangePlateSignUpState extends State<OrangePlateSignUp> {
  final TextEditingController emailController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

  final TextEditingController nameController = TextEditingController();

  final TextEditingController phoneController = TextEditingController();

  bool _passwordVisible = false;
  bool _isLoading = false;

  void registerUser(BuildContext context) async {
    setState(() {
      _isLoading = true;
    });
    try {
      var response = await http.post(
        Uri.parse(signupUrl),
        body: jsonEncode({
          'email': emailController.text,
          'password': passwordController.text,
          'name': nameController.text,
          'phone': phoneController.text,
        }),
        headers: {'Content-Type': 'application/json'},
      );
      if (response.statusCode == 200) {
        var data = jsonDecode(response.body);
        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString(
            'userId', data['newUser']['id']); // Store the user ID
        await prefs.setString('userToken', data['token']); // Store the token
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => CustomerBottomNavBar()),
        );
      } else {
        var errorData = jsonDecode(response.body);
        throw Exception(errorData['error']
            ['message']); // Use the specific error message from the response
      }
    } catch (e) {
      print(e.toString());
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error: ${e.toString()}'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Define initialNumber with a default value
    PhoneNumber initialNumber = PhoneNumber(isoCode: 'GH');

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
                      'Sign Up',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Full Name TextField
                    TextField(
                      controller: nameController,
                      decoration: const InputDecoration(
                        labelText: 'Full name',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Email TextField
                    TextField(
                      controller: emailController,
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Password TextField
                    TextField(
                      controller: passwordController,
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
                    const SizedBox(height: 10),
                    // Phone Number TextField with Country Selector
                    Container(
                      padding:
                          EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(5),
                        border: Border.all(color: Colors.grey),
                      ),
                      child: Row(
                        children: [
                          Flexible(
                            child: InternationalPhoneNumberInput(
                              onInputChanged: (PhoneNumber number) {
                                print(number.phoneNumber);
                              },
                              onInputValidated: (bool value) {
                                print(value);
                              },
                              selectorConfig: const SelectorConfig(
                                selectorType: PhoneInputSelectorType.DIALOG,
                              ),
                              ignoreBlank: false,
                              autoValidateMode: AutovalidateMode.disabled,
                              selectorTextStyle:
                                  const TextStyle(color: Colors.black),
                              initialValue: initialNumber,
                              textFieldController: phoneController,
                              formatInput: false,
                              keyboardType:
                                  const TextInputType.numberWithOptions(
                                      signed: true, decimal: true),
                              inputDecoration: const InputDecoration(
                                border: InputBorder.none,
                                labelText: 'Phone number',
                              ),
                              onSaved: (PhoneNumber number) {
                                print('On Saved: $number');
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Register Button
                    ElevatedButton(
                      onPressed: () => registerUser(
                          context), // Use the registerUser function with context
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.orange,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50, vertical: 15),
                      ),
                      child: const Text('Register'),
                    ),
                    const SizedBox(height: 10),
                    // Sign In Link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          "Already have an account?",
                          style:
                              TextStyle(fontSize: 12, color: Colors.grey[700]),
                        ),
                        TextButton(
                          onPressed: () {
                            Navigator.pushReplacement(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => OrangePlateLogin()),
                            );
                          },
                          child: const Text(
                            'Sign In',
                            style:
                                TextStyle(fontSize: 12, color: Colors.orange),
                          ),
                        ),
                      ],
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
