import 'package:flutter/material.dart';

class DeliveryHomeScreen extends StatefulWidget {
  const DeliveryHomeScreen({super.key});

  @override
  State<DeliveryHomeScreen> createState() => _DeliveryHomeScreenState();
}

class _DeliveryHomeScreenState extends State<DeliveryHomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.orangeAccent,
        elevation: 0,
        // toolbarHeight: 100,
        flexibleSpace: SafeArea(
          child: Column(
            children: [
              // SizedBox(height: 20),
              Image.asset('assets/logo.png',
                  height: 40), // Replace with your logo
            ],
          ),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          // Added SingleChildScrollView
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    'Hello, Chris👋',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  Spacer(), // This Spacer should be removed or replaced
                  Icon(Icons.notifications, size: 30),
                ],
              ),
              SizedBox(height: 10),
              Row(
                children: [
                  Icon(Icons.location_pin, color: Colors.red),
                  Text('Ayeduase, Kumasi'),
                  Icon(Icons.arrow_drop_down),
                ],
              ),
              SizedBox(height: 20),
              Card(
                color: Colors.orange[100],
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Welcome',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 10),
                          Text(
                            'No Delivery is Worth Risking\nYour Safety. Take Your Time\nYour Safety is Our Concern',
                            style: TextStyle(fontSize: 14),
                          ),
                        ],
                      ),
                      Spacer(), // This Spacer should be removed or replaced
                      Image.asset('assets/logo.png',
                          height: 60), // Replace with your image
                    ],
                  ),
                ),
              ),
              SizedBox(height: 20),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics:
                    NeverScrollableScrollPhysics(), // Added to prevent GridView from scrolling
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                children: [
                  _buildGridItem(Icons.delivery_dining, 'Orders'),
                  _buildGridItem(Icons.attach_money, 'Earnings'),
                  _buildGridItem(Icons.bar_chart, 'Stats'),
                  _buildGridItem(Icons.person, 'Profile'),
                ],
              ),
              SizedBox(height: 20), // Added SizedBox to provide spacing
              ElevatedButton.icon(
                onPressed: () {},
                icon: Icon(Icons.map),
                label: Text('View Live Map'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  minimumSize: Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildGridItem(IconData icon, String label) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 40, color: Colors.orange),
            SizedBox(height: 10),
            Text(label, style: TextStyle(fontSize: 16)),
          ],
        ),
      ),
    );
  }
}
