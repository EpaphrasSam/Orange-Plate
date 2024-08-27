import 'package:flutter/material.dart';

class AvailableOrdersScreen extends StatefulWidget {
  @override
  State<AvailableOrdersScreen> createState() => _AvailableOrdersScreenState();
}

class _AvailableOrdersScreenState extends State<AvailableOrdersScreen> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          leading: IconButton(
            icon: Icon(Icons.arrow_back, color: Colors.black),
            onPressed: () {
              // Handle back button press
            },
          ),
          title: Text('Orders', style: TextStyle(color: Colors.black)),
          actions: [
            IconButton(
              icon: Icon(Icons.map, color: Colors.blue),
              onPressed: () {
                // Handle map button press
              },
            ),
          ],
          bottom: TabBar(
            labelColor: Colors.black,
            unselectedLabelColor: Colors.grey,
            indicatorColor: Colors.black,
            tabs: [
              Tab(text: 'Active'),
              Tab(text: 'History'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            OrdersList(),
            Center(child: Text('History')), // Placeholder for History tab
          ],
        ),
      ),
    );
  }
}

class OrdersList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16.0),
      children: [
        OrderCard(
          logo: 'assets/ham.png', // Replace with your image asset
          restaurant: 'Pizzaman Chickenman',
          location: 'KNUST Campus',
          distance: '3.7km',
          customer: 'Chris Baffour',
          customerDistance: 'Kotei Assemblies 3.2km',
        ),
        OrderCard(
          logo: 'assets/ham.png', // Replace with your image asset
          restaurant: 'KFC',
          location: 'Kumasi City Mall',
          distance: '2.7km',
          customer: 'Chris Baffour',
          customerDistance: 'KNUST Hall 7 2.1km',
        ),
        OrderCard(
          logo: 'assets/restaurant1.jpg', // Replace with your image asset
          restaurant: 'Papa\'s Pizza',
          location: 'KNUST',
          distance: '3.6km',
          customer: 'Chris Baffour',
          customerDistance: 'Kotei Assemblies 3.6km',
        ),
        OrderCard(
          logo: 'assets/restaurant2.jpg', // Replace with your image asset
          restaurant: 'Splendor Pizza',
          location: 'KNUST Campus',
          distance: '3.6km',
          customer: 'Chris Baffour',
          customerDistance: 'Kotei Assemblies 3.6km',
        ),
      ],
    );
  }
}

class OrderCard extends StatelessWidget {
  final String logo;
  final String restaurant;
  final String location;
  final String distance;
  final String customer;
  final String customerDistance;

  OrderCard({
    required this.logo,
    required this.restaurant,
    required this.location,
    required this.distance,
    required this.customer,
    required this.customerDistance,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Image.asset(logo, height: 40), // Replace with your image asset
                SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(restaurant,
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.bold)),
                    Text(location),
                    Text(distance),
                  ],
                ),
                Spacer(),
                Icon(Icons.close, color: Colors.grey),
              ],
            ),
            SizedBox(height: 10),
            Row(
              children: [
                CircleAvatar(
                  backgroundImage: AssetImage(
                      'assets/customer.png'), // Replace with your image asset
                  radius: 15,
                ),
                SizedBox(width: 10),
                Text(customer),
                Spacer(),
                Icon(Icons.location_pin, color: Colors.red),
                Text(customerDistance),
              ],
            ),
            SizedBox(height: 10),
            Row(
              children: [
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Accept'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                  ),
                ),
                SizedBox(width: 10),
                ElevatedButton(
                  onPressed: () {},
                  child: Text('Know more'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
