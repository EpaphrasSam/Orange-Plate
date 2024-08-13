import 'package:flutter/material.dart';

class CuisinesScreen extends StatefulWidget {
  @override
  State<CuisinesScreen> createState() => _CuisinesScreenState();
}

class _CuisinesScreenState extends State<CuisinesScreen> {
  final List<Restaurant> restaurants = [
    Restaurant(name: 'Tasty Queen Restaurant', rating: 4.5),
    Restaurant(name: 'Papa\'s Pizza Joint', rating: 4.0),
    Restaurant(name: 'Pice Restaurant', rating: 4.3),
    // Add more restaurants here
  ];

  final List<Cuisine> cuisines = [
    Cuisine(
      imageUrl: 'assets/burger.jpg',
      title: 'Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Cuisine(
      imageUrl: 'assets/ham.png',
      title: 'Pizza',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Cuisine(
      imageUrl: 'assets/burger.jpg',
      title: 'Fried Rice',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    Cuisine(
      imageUrl: 'assets/burger.jpg',
      title: 'French Fries',
      description: 'Chicken & Tomato',
      price: '₵25.00',
    ),
    // Add more cuisines here
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        
        title: Text('Cuisines'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Search Bar
              TextField(
                decoration: InputDecoration(
                  hintText: 'Search for restaurants, dishes...',
                  prefixIcon: Icon(Icons.search),
                  suffixIcon: Icon(Icons.filter_list),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
              ),
              SizedBox(height: 20),
              // Restaurant List
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Restaurants',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      // Handle view all button press
                    },
                    child: Text('View all'),
                  ),
                ],
              ),
              SizedBox(height: 10),
              Container(
                height: 100,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: restaurants.length,
                  itemBuilder: (context, index) {
                    return RestaurantCard(restaurant: restaurants[index]);
                  },
                ),
              ),
              SizedBox(height: 20),
              // Cuisines List
              Text(
                'Cuisines',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10),
              GridView.builder(
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  mainAxisSpacing: 10,
                  crossAxisSpacing: 10,
                  childAspectRatio: 0.75,
                ),
                itemCount: cuisines.length,
                itemBuilder: (context, index) {
                  return CuisineCard(cuisine: cuisines[index]);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Restaurant {
  final String name;
  final double rating;

  Restaurant({required this.name, required this.rating});
}

class Cuisine {
  final String imageUrl;
  final String title;
  final String description;
  final String price;

  Cuisine({
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.price,
  });
}

// import 'package:flutter/material.dart';
class RestaurantCard extends StatelessWidget {
  final Restaurant restaurant;

  const RestaurantCard({required this.restaurant});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 150,
      padding: EdgeInsets.all(8),
      margin: EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.grey),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 20,
            backgroundImage: AssetImage(
                'assets/logo.png'), // Ensure you have this image in your assets
          ),
          SizedBox(width: 10),
          Flexible(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  restaurant.name,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                  // Remove overflow to allow wrapping
                ),
                SizedBox(height: 2),
                Row(
                  children: List.generate(5, (index) {
                    return Icon(
                      index < restaurant.rating
                          ? Icons.star
                          : Icons.star_border,
                      size: 12,
                      color: Colors.orange,
                    );
                  }),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class CuisineCard extends StatelessWidget {
  final Cuisine cuisine;

  const CuisineCard({required this.cuisine});

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              ClipRRect(
                borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
                child: Image.asset(
                  cuisine.imageUrl,
                  width: double.infinity,
                  height: 100,
                  fit: BoxFit.cover,
                ),
              ),
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding: EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    Icons.favorite_border,
                    color: Colors.red,
                    size: 20,
                  ),
                ),
              ),
            ],
          ),
          Expanded(
            // Ensure the orange container takes up the remaining space
            child: Container(
              decoration: BoxDecoration(
                color: Colors.orange, // Set the background color to orange
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(10),
                  bottomRight: Radius.circular(10),
                ), // Curved border and bottom edges
              ),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      cuisine.title,
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 5),
                    Text(
                      cuisine.description,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.black,
                      ),
                    ),
                    SizedBox(height: 5),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            cuisine.price,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Colors.black,
                            ),
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
