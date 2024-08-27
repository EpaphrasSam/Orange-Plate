import 'package:flutter/material.dart';

class DeliveryClientDetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width *
                  0.8, // 80% of screen width
              height: 300, // Increase height as needed
              child: Card(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    children: [
                      CircleAvatar(
                        backgroundImage: AssetImage(
                            'assets/man.jpg'), // Replace with your image asset
                        radius: 40,
                      ),
                      SizedBox(height: 10),
                      Text(
                        'Chris Baffour',
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        '#213344',
                        style: TextStyle(color: Colors.grey),
                      ),
                      SizedBox(height: 10),
                      Text(
                        'Arrived in 22 minutes',
                        style: TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconButton(
              icon: const Icon(Icons.mail, color: Colors.grey),
              onPressed: () {
                // Handle message button press
              },
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
                padding:
                    const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
              ),
              child: const Text('Done'),
            ),
            IconButton(
              icon: const Icon(Icons.phone, color: Colors.grey),
              onPressed: () {
                // Handle call button press
              },
            ),
          ],
        ),
      ),
    );
  }
}
