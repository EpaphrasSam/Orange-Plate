import 'package:flutter/material.dart';

class CartScreen extends StatefulWidget {
  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  final List<CartProduct> cartProducts = [
    CartProduct(
      imageUrl: 'assets/ham.png',
      title: 'Burger',
      description: 'Chicken & Tomato',
      price: '₵25.00',
      quantity: 2,
    ),
    CartProduct(
      imageUrl: 'assets/ham.png',
      title: 'Pizza Fries',
      description: 'Chicken & Tomato',
      price: '₵25.00',
      quantity: 2,
    ),
    CartProduct(
      imageUrl: 'assets/ham.png',
      title: 'Fried Rice',
      description: 'Chicken & Tomato',
      price: '₵25.00',
      quantity: 2,
    ),
    CartProduct(
      imageUrl: 'assets/ham.png',
      title: 'Gari & Beans',
      description: 'Chicken & Tomato',
      price: '₵25.00',
      quantity: 2,
    ),
    CartProduct(
      imageUrl: 'assets/ham.png',
      title: 'Fried Rice',
      description: 'Chicken & Tomato',
      price: '₵25.00',
      quantity: 2,
    ),
    // Add more products here
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cart'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        centerTitle: true,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton(
                  onPressed: () {
                    // Handle select all action
                  },
                  child: const Text(
                    'Select All',
                    style: TextStyle(color: Colors.black),
                  ),
                ),
                TextButton(
                  onPressed: () {
                    // Handle delete all action
                  },
                  child: const Text(
                    'Delete All',
                    style: TextStyle(color: Colors.black),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: cartProducts.length,
              itemBuilder: (context, index) {
                return CartProductCard(product: cartProducts[index]);
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                const SummaryRow(label: 'Items', value: '₵125.00'),
                const SummaryRow(label: 'Discounts', value: '-₵15.00'),
                const Divider(),
                const SummaryRow(label: 'Total', value: '₵99.00'),
                const SizedBox(height: 10),
                ElevatedButton(
                  onPressed: () {
                    // Handle checkout action
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 50, vertical: 15),
                  ),
                  child: const Text('Checkout'),
                ),
                // TextButton(
                //   onPressed: () {
                //     // Handle add more food action
                //   },
                //   child: const Text('Add More Food'),
                // ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class CartProduct {
  final String imageUrl;
  final String title;
  final String description;
  final String price;
  int quantity;

  CartProduct({
    required this.imageUrl,
    required this.title,
    required this.description,
    required this.price,
    required this.quantity,
  });
}

class CartProductCard extends StatefulWidget {
  final CartProduct product;

  const CartProductCard({required this.product});

  @override
  _CartProductCardState createState() => _CartProductCardState();
}

class _CartProductCardState extends State<CartProductCard> {
  bool isChecked = true;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        children: [
          Checkbox(
            value: isChecked,
            onChanged: (value) {
              setState(() {
                isChecked = value!;
              });
            },
            activeColor: Colors.orange,
          ),
          ClipRRect(
            borderRadius: BorderRadius.circular(10),
            child: Image.asset(
              widget.product.imageUrl,
              width: 60,
              height: 60,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.product.title,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  widget.product.description,
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  widget.product.price,
                  style: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: Colors.orange,
                  ),
                ),
              ],
            ),
          ),
          QuantitySelector(
            quantity: widget.product.quantity,
            onQuantityChanged: (quantity) {
              setState(() {
                widget.product.quantity = quantity;
              });
            },
          ),
        ],
      ),
    );
  }
}

class QuantitySelector extends StatelessWidget {
  final int quantity;
  final ValueChanged<int> onQuantityChanged;

  const QuantitySelector(
      {required this.quantity, required this.onQuantityChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 2),
      decoration: BoxDecoration(
        color: Colors.grey[200],
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
        children: [
          _buildIconButton(
            icon: Icons.remove_circle,
            onPressed: () {
              if (quantity > 1) {
                onQuantityChanged(quantity - 1);
              }
            },
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: const BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
              child: Text(
                '$quantity',
                style: const TextStyle(
                  fontSize: 16,
                ),
              ),
            ),
          ),
          _buildIconButton(
            icon: Icons.add_circle,
            onPressed: () {
              onQuantityChanged(quantity + 1);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildIconButton(
      {required IconData icon, required VoidCallback onPressed}) {
    return Padding(
      padding: const EdgeInsets.all(2.0),
      child: Container(
        decoration: const BoxDecoration(
          // color: Colors.white,
          shape: BoxShape.circle,
        ),
        child: IconButton(
          icon: Icon(icon),
          onPressed: onPressed,
          color: Colors.black,
          constraints: const BoxConstraints(maxHeight: 24, maxWidth: 24),
          padding: EdgeInsets.zero,
        ),
      ),
    );
  }
}

class SummaryRow extends StatelessWidget {
  final String label;
  final String value;

  const SummaryRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey[600],
            ),
          ),
          Text(
            value,
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
