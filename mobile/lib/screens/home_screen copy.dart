// import 'package:flutter/material.dart';
// import 'package:geolocator/geolocator.dart'; // Import Geolocator for Position
// import 'package:mobile/services/api_services.dart';
// import '../services/location_service.dart';

// class HomePage extends StatefulWidget {
//   @override
//   _HomePageState createState() => _HomePageState();
// }

// class _HomePageState extends State<HomePage> {
//   final LocationService _locationService = LocationService();
//   final ApiService _apiService = ApiService();
//   final TextEditingController _locationController = TextEditingController();

//   @override
//   void initState() {
//     super.initState();
//     _fetchData();
//   }

//   void _fetchData() async {
//     try {
//       Position? position = await _locationService.getCurrentLocation();
//       if (position != null) {
//         _locationController.text =
//             "${position.latitude}, ${position.longitude}";
//         await _apiService.postUserCoordinates(position);
//       }
//     } catch (e) {
//       showDialog(
//         context: context,
//         builder: (ctx) => AlertDialog(
//           title: const Text('Error'),
//           content: Text(e.toString()),
//           actions: <Widget>[
//             TextButton(
//               child: const Text('Ok'),
//               onPressed: () {
//                 Navigator.of(ctx).pop();
//               },
//             ),
//           ],
//         ),
//       );
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         leading: const Padding(
//           padding: EdgeInsets.all(8.0),
//           child: CircleAvatar(
//             backgroundImage: AssetImage(
//                 'assets/man.jpg'), // Ensure this image is in your assets
//           ),
//         ),
//         title: const Text('Hello, Chris!'),
//         backgroundColor: Colors.white,
//         elevation: 0,
//       ),
//       body: SingleChildScrollView(
//         child: Center(
//           child: Padding(
//             padding: const EdgeInsets.all(20.0),
//             child: Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               children: [
//                 TextField(
//                   controller: _locationController,
//                   decoration: InputDecoration(
//                     labelText: 'Your Coordinates',
//                     border: OutlineInputBorder(),
//                     suffixIcon: IconButton(
//                       icon: const Icon(Icons.location_searching),
//                       onPressed: _fetchData,
//                     ),
//                   ),
//                 ),
//                 const SizedBox(height: 20),
//                 ElevatedButton(
//                   onPressed: () {
//                     if (_locationController.text.isNotEmpty) {
//                       _fetchData();
//                     }
//                   },
//                   style: ElevatedButton.styleFrom(
//                     foregroundColor: Colors.white,
//                     backgroundColor: Colors.orange, // Text color
//                     padding: const EdgeInsets.symmetric(
//                         horizontal: 50, vertical: 20),
//                   ),
//                   child: const Text('Update Location'),
//                 ),
//               ],
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }

// class CategoryIcon extends StatelessWidget {
//   final IconData icon;
//   final String label;

//   const CategoryIcon({required this.icon, required this.label});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Container(
//           width: 60,
//           height: 60,
//           decoration: BoxDecoration(
//             border:
//                 Border.all(color: Colors.orange, width: 2), // Circular border
//             shape: BoxShape.circle,
//           ),
//           child: Icon(icon, size: 32, color: Colors.orange),
//         ),
//         const SizedBox(height: 4),
//         Text(label,
//             style: const TextStyle(fontWeight: FontWeight.bold)), // Label text
//       ],
//     );
//   }
// }

// class CuisineCard extends StatelessWidget {
//   final Cuisine cuisine;

//   const CuisineCard({required this.cuisine});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Expanded(
//           child: Container(
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(16.0),
//               image: DecorationImage(
//                 image: AssetImage(cuisine.imagePath),
//                 fit: BoxFit.cover,
//               ),
//             ),
//             child: Align(
//               alignment: Alignment.topRight,
//               child: Padding(
//                 padding: const EdgeInsets.all(8.0),
//                 child: Icon(
//                   Icons.favorite,
//                   color: cuisine.isFavorite ? Colors.red : Colors.white,
//                 ),
//               ),
//             ),
//           ),
//         ),
//         const SizedBox(height: 8),
//         Text(
//           cuisine.name,
//           style: const TextStyle(
//               fontWeight: FontWeight.bold, fontSize: 16), // Cuisine name text
//         ),
//       ],
//     );
//   }
// }

// class Cuisine {
//   final String name;
//   final String imagePath;
//   final bool isFavorite;

//   Cuisine(
//       {required this.name, required this.imagePath, this.isFavorite = false});
// }

// final cuisines = [
//   Cuisine(name: 'Fried Rice', imagePath: 'assets/ham.png', isFavorite: true),
//   Cuisine(
//       name: 'Jollof Rice', imagePath: 'assets/burger.jpg', isFavorite: true),
//   Cuisine(name: 'Pizza', imagePath: 'assets/ham.png', isFavorite: true),
//   Cuisine(name: 'Burger', imagePath: 'assets/burger.jpg', isFavorite: true),
//   // Add more cuisines as required
// ];

// class RestaurantCard extends StatelessWidget {
//   final Restaurant restaurant;

//   const RestaurantCard({required this.restaurant});

//   @override
//   Widget build(BuildContext context) {
//     return Column(
//       children: [
//         Expanded(
//           child: Container(
//             decoration: BoxDecoration(
//               borderRadius: BorderRadius.circular(16.0),
//               image: DecorationImage(
//                 image: AssetImage(restaurant.imagePath),
//                 fit: BoxFit.cover,
//               ),
//             ),
//             child: Align(
//               alignment: Alignment.topRight,
//               child: Padding(
//                 padding: const EdgeInsets.all(8.0),
//                 child: Icon(
//                   Icons.favorite,
//                   color: restaurant.isFavorite ? Colors.red : Colors.white,
//                 ),
//               ),
//             ),
//           ),
//         ),
//         const SizedBox(height: 8),
//         Text(
//           restaurant.name,
//           style: const TextStyle(
//               fontWeight: FontWeight.bold,
//               fontSize: 16), // Restaurant name text
//         ),
//         Text(
//           restaurant.location,
//           style: TextStyle(color: Colors.grey[600]), // Location text
//         ),
//       ],
//     );
//   }
// }

// class Restaurant {
//   final String name;
//   final String location;
//   final String imagePath;
//   final bool isFavorite;

//   Restaurant(
//       {required this.name,
//       required this.location,
//       required this.imagePath,
//       this.isFavorite = false});
// }

// final restaurants = [
//   Restaurant(
//       name: 'The Grill House',
//       location: '123 Food Street',
//       imagePath: 'assets/restaurant2.jpg',
//       isFavorite: true),
//   Restaurant(
//       name: 'Sushi Palace',
//       location: '456 Sushi Avenue',
//       imagePath: 'assets/restaurant1.jpg',
//       isFavorite: false),
//   Restaurant(
//       name: 'Pasta Paradise',
//       location: '789 Italian Road',
//       imagePath: 'assets/restaurant1.jpg',
//       isFavorite: true),
//   Restaurant(
//       name: 'Burger World',
//       location: '101 Burger Lane',
//       imagePath: 'assets/restaurant2.jpg',
//       isFavorite: true),
//   // Add more restaurants as required
// ];
