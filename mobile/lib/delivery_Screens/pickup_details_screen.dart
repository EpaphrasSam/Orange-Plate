import 'package:flutter/material.dart';
import 'package:mobile/functions/back_button_func.dart';

class PickupDetailsScreen extends StatelessWidget {
  const PickupDetailsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: buildBackButton(context),
        title:
            const Text('Pickup Details', style: TextStyle(color: Colors.black)),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            SizedBox(
              width: double.infinity, // Full width
              height: 200, // Given height
              child: Image.asset(
                'assets/ham.png', // Replace with your image asset
                fit: BoxFit.cover, // Cover the container
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.location_pin, color: Colors.orange),
                      const SizedBox(width: 5),
                      const Text('Kumasi, Ghana'),
                      const Spacer(),
                      IconButton(
                        icon: const Icon(Icons.phone, color: Colors.green),
                        onPressed: () {
                          // Handle call button press
                        },
                      ),
                    ],
                  ),
                  const Text(
                    'Pizzaman Chickenman',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 20),
                  Container(
                    height: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Center(
                      child: Text(
                          'Map Placeholder'), // Replace with your map widget
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        children: [
                          Icon(Icons.location_pin, color: Colors.orange),
                          Text('Destination'),
                        ],
                      ),
                      Column(
                        children: [
                          Icon(Icons.swap_horiz, color: Colors.blue),
                          Text('Pickup'),
                        ],
                      ),
                      Column(
                        children: [
                          Icon(Icons.delivery_dining, color: Colors.red),
                          Text('Delivery'),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('3.7km'),
                      Text('3.2km'),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _buildDetailCard('Pickup', '20min'),
                      _buildDetailCard('Packages', '8 Packs'),
                      _buildDetailCard('Payout', '35 cedis'),
                    ],
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red,
                            padding: const EdgeInsets.symmetric(vertical: 15),
                          ),
                          child: const Text('Cancel Order'),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.green,
                            padding: const EdgeInsets.symmetric(vertical: 15),
                          ),
                          child: const Text('Accept Order'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailCard(String title, String value) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text(title, style: const TextStyle(color: Colors.grey)),
            const SizedBox(height: 5),
            Text(value,
                style:
                    const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }
}
