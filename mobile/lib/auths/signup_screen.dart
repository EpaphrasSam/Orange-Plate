import 'package:flutter/material.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:mobile/auths/login_screen.dart';

class OrangePlateSignUp extends StatelessWidget {
  final TextEditingController controller = TextEditingController();
  final PhoneNumber initialNumber = PhoneNumber(isoCode: 'GH');

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
                      'Sign Up',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 10),
                    // Full Name TextField
                    const TextField(
                      decoration: InputDecoration(
                        labelText: 'Full name',
                        border: OutlineInputBorder(),
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
                              textFieldController: controller,
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
                      onPressed: () {
                        // TODO: handle the register logic here
                      },
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
