// import 'package:flutter/material.dart';

// class HomePage extends StatefulWidget {
//   @override
//   State<HomePage> createState() => _HomePageState();
// }

// class _HomePageState extends State<HomePage> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         leading: Padding(
//           padding: const EdgeInsets.all(8.0),
//           child: CircleAvatar(
//             backgroundImage: AssetImage('assets/man.jpg'),
//           ),
//         ),
//         title: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Text('Hello, Chris!'),
//           ],
//         ),
//         actions: [
//           IconButton(
//             icon: Icon(Icons.notifications),
//             onPressed: () {},
//           ),
//         ],
//         backgroundColor: Colors.white,
//         elevation: 0,
//       ),
//       body: SingleChildScrollView(
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             // Banner Image
//             ClipRRect(
//               borderRadius: BorderRadius.circular(16.0),
//               child: Container(
//                 margin: EdgeInsets.all(16.0),
//                 height: 200,
//                 decoration: BoxDecoration(
//                   borderRadius: BorderRadius.circular(16.0),
//                   image: DecorationImage(
//                     image: AssetImage(
//                         'assets/burger.jpg'), // Replace with your image
//                     fit: BoxFit.cover, // Changed to cover for a better fit
//                   ),
//                 ),
//               ),
//             ),

//             // Categories
//             Padding(
//               padding: const EdgeInsets.symmetric(horizontal: 16.0),
//               child: Row(
//                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
//                 children: [
//                   CategoryIcon(icon: Icons.star, label: 'Popular'),
//                   CategoryIcon(icon: Icons.local_pizza, label: 'Western'),
//                   CategoryIcon(icon: Icons.local_drink, label: 'Drinks'),
//                   CategoryIcon(icon: Icons.restaurant, label: 'Local'),
//                 ],
//               ),
//             ),
//             // Cuisines Section
//             Padding(
//               padding: const EdgeInsets.all(16.0),
//               child: Column(
//                 crossAxisAlignment: CrossAxisAlignment.start,
//                 children: [
//                   Text('Cuisines',
//                       style:
//                           TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
//                   SizedBox(height: 8),
//                   GridView.builder(
//                     shrinkWrap: true,
//                     physics: NeverScrollableScrollPhysics(),
//                     gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
//                       crossAxisCount: 2,
//                       childAspectRatio: 0.75, // Adjusted for better fit
//                       crossAxisSpacing: 10,
//                       mainAxisSpacing: 10,
//                     ),
//                     itemCount: cuisines.length,
//                     itemBuilder: (context, index) {
//                       return CuisineCard(cuisine: cuisines[index]);
//                     },
//                   ),
//                   SizedBox(
//                     height: 20,
//                   ),
//                   Text('Restaurants',
//                       style:
//                           TextStyle(fontWeight: FontWeight.bold, fontSize: 20)),
//                   SizedBox(height: 8),
//                   GridView.builder(
//                     shrinkWrap: true,
//                     physics: NeverScrollableScrollPhysics(),
//                     gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
//                       crossAxisCount: 2,
//                       childAspectRatio: 0.75, // Adjusted for better fit
//                       crossAxisSpacing: 10,
//                       mainAxisSpacing: 10,
//                     ),
//                     itemCount: restaurants.length,
//                     itemBuilder: (context, index) {
//                       return RestaurantCard(restaurant: restaurants[index]);
//                     },
//                   ),
//                 ],
//               ),
//             ),
//           ],
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
//         SizedBox(height: 4),
//         Text(label,
//             style: TextStyle(fontWeight: FontWeight.bold)), // Label text
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
//         SizedBox(height: 8),
//         Text(
//           cuisine.name,
//           style: TextStyle(
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

// // import 'package:flutter/material.dart';

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
//         SizedBox(height: 8),
//         Text(
//           restaurant.name,
//           style: TextStyle(
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
