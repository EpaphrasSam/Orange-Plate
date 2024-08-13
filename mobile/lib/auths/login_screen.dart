import 'package:flutter/material.dart';
import 'package:mobile/auths/signup_screen.dart';

class OrangePlateLogin extends StatelessWidget {
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
                    const TextField(
                      decoration: InputDecoration(
                        labelText: 'Email',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Password TextField
                    const TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    const SizedBox(height: 20),
                    // Sign In Button
                    ElevatedButton(
                      onPressed: () {
                        // TODO: Add the login logic using the endpoint here
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.orange,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                        padding: const EdgeInsets.symmetric(
                            horizontal: 50, vertical: 15),
                      ),
                      child: const Text('Sign In'),
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
