import 'package:flutter/material.dart';
import 'package:mobile/delivery_Screens/delivery_profile_screen.dart';
// import 'package:mobile/delivery_Screens/delivery_stats_screen.dart';
import 'package:mobile/delivery_Screens/delivery_statistics_screen.dart';
import 'package:mobile/delivery_Screens/earnings_statistics_screen.dart';

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
              const Row(
                children: [
                  Text(
                    'Hello, Chris👋',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  Spacer(), // This Spacer should be removed or replaced
                  Icon(Icons.notifications, size: 30),
                ],
              ),
              const SizedBox(height: 10),
              const Row(
                children: [
                  Icon(Icons.location_pin, color: Colors.red),
                  Text('Ayeduase, Kumasi'),
                  Icon(Icons.arrow_drop_down),
                ],
              ),
              const SizedBox(height: 20),
              Card(
                color: Colors.yellow[300],
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Row(
                    children: [
                      const Column(
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
                      const Spacer(), // This Spacer should be removed or replaced
                      Image.asset('assets/delivery.png',
                          height: 60), // Replace with your image
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 20),
              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics:
                    const NeverScrollableScrollPhysics(), // Added to prevent GridView from scrolling
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                children: [
                  _buildGridItem(Icons.delivery_dining, 'Orders'),
                  _buildGridItem(Icons.attach_money, 'Earnings'),
                  _buildGridItem(Icons.bar_chart, 'Stats'),
                  _buildGridItem(Icons.person, 'Profile'),
                ],
              ),
              const SizedBox(height: 20), // Added SizedBox to provide spacing
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.map, color: Colors.white),
                label: const Text('View Live Map',
                    style: TextStyle(color: Colors.white)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  minimumSize: const Size(double.infinity, 50),
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
        borderRadius: BorderRadius.circular(30),
      ),
      child: InkWell(
        onTap: () {
          switch (label) {
            case 'Orders':
              Navigator.pushNamed(context, '/delivery_orders');
              break;
            case 'Earnings':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => EarningsStatisticsScreen()),
              );
              break;
            case 'Stats':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => DeliveryStatsScreen()),
              );
              break;
            case 'Profile':
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => DeliveryProfileScreen()),
              );
              break;
          }
        },
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 40, color: Colors.orange),
              const SizedBox(height: 10),
              Text(label, style: const TextStyle(fontSize: 16)),
            ],
          ),
        ),
      ),
    );
  }
}
