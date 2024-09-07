import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobile/constants/file_path.dart';
// imp:mobile/models/cart_model.dart';
import 'package:mobile/services/api_services.dart';

import '../models/cart_model.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  List<CartProduct> cartProducts = [];
  bool isLoading = true;
  String errorMessage = '';
  bool isPlacingOrder = false;
  bool isDeletingAll = false;

  @override
  void initState() {
    super.initState();
    fetchCartItems();
  }

  Future<void> fetchCartItems() async {
    setState(() {
      isLoading = true;
      errorMessage = '';
    });

    try {
      print("Fetching cart items..."); // Debug print
      final apiService = ApiService();
      final fetchedProducts = await apiService.fetchCartItems();
      print("Fetched ${fetchedProducts.length} items"); // Debug print

      setState(() {
        cartProducts = fetchedProducts;
        isLoading = false;
      });
    } catch (e) {
      print('Error fetching cart items: $e'); // Debug print
      setState(() {
        isLoading = false;
        errorMessage = 'Failed to load cart items. Please try again.';
      });
    }
  }

  double calculateDiscount(double total) {
    if (total > 500) {
      return total * 0.01; // 1% discount
    }
    return 0;
  }

  double calculateTotal() {
    double itemsTotal = cartProducts.fold(
        0,
        (sum, item) =>
            sum + (item.isChecked ? item.menuItem.price * item.quantity : 0));
    double discount = calculateDiscount(itemsTotal);
    return itemsTotal - discount;
  }

  Future<void> updateCartItemQuantity(
      CartProduct product, int newQuantity) async {
    // Immediately update the UI
    setState(() {
      product.updateQuantity(newQuantity);
    });

    try {
      final apiService = ApiService();
      if (newQuantity > 0) {
        // Perform the API call in the background
        apiService.editCartItemQuantity(product.id, newQuantity);
      } else {
        bool confirmDelete =
            await showDeleteConfirmationDialog(context, product);
        if (confirmDelete) {
          setState(() {
            cartProducts.remove(product);
          });
          // Perform the API call in the background
          apiService.deleteCartItem(product.id);
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                '${product.menuItem.name} removed from cart',
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.white),
              ),
              behavior: SnackBarBehavior.floating,
              backgroundColor: Colors.green,
              duration: const Duration(seconds: 5),
              action: SnackBarAction(
                label: 'Undo',
                textColor: Colors.white,
                onPressed: () {
                  restoreDeletedItem(product);
                },
              ),
            ),
          );
        } else {
          // If deletion is cancelled, revert the quantity
          setState(() {
            product.updateQuantity(1);
          });
        }
      }
    } catch (e) {
      // If there's an error, revert the change and show an error message
      setState(() {
        product.updateQuantity(product.quantity);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          behavior: SnackBarBehavior.floating,
          content: Text(
            'Failed to update cart: $e',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white),
          ),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<void> restoreDeletedItem(CartProduct product) async {
    try {
      final apiService = ApiService();
      await apiService.addToCart(product.menuItem.id, product.quantity);
      setState(() {
        cartProducts.add(product);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('${product.menuItem.name} restored to cart'),
          backgroundColor: Colors.green,
        ),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to restore item: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<bool> showDeleteConfirmationDialog(
      BuildContext context, CartProduct product) async {
    return await showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Confirm Deletion'),
              content: Text(
                  'Are you sure you want to remove ${product.menuItem.name} from your cart?'),
              actions: <Widget>[
                TextButton(
                  child: const Text(
                    'Delete',
                    style: TextStyle(color: Colors.red),
                  ),
                  onPressed: () => Navigator.of(context).pop(true),
                ),
                TextButton(
                  child: const Text('Cancel'),
                  onPressed: () => Navigator.of(context).pop(false),
                ),
              ],
            );
          },
        ) ??
        false; // Return false if dialog is dismissed
  }

  void updateCartItemChecked(CartProduct product, bool isChecked) {
    setState(() {
      product.isChecked = isChecked;
    });
    // You might want to call an API to update the cart on the server here
  }

  Future<void> handleCheckout() async {
    if (cartProducts.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Your cart is empty')),
      );
      return;
    }

    setState(() {
      isPlacingOrder = true;
    });

    try {
      double total = calculateTotal();
      String restaurantId = cartProducts.first.menuItem.restaurantId;
      List<String> cartItemIds = cartProducts
          .where((item) => item.isChecked)
          .map((item) => item.id)
          .toList();

      final apiService = ApiService();
      await apiService.checkout(total, restaurantId, cartItemIds);

      // Clear the cart items after successful order placement
      setState(() {
        cartProducts.clear();
      });

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Order placed successfully',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white),
          ),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );

      // Optionally, you can call an API to clear the cart on the server
      // await apiService.clearCart();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            'Failed to place order: $e',
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white),
          ),
          behavior: SnackBarBehavior.floating,
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        isPlacingOrder = false;
      });
    }
  }

  bool get areAllItemsSelected =>
      cartProducts.isNotEmpty &&
      cartProducts.every((product) => product.isChecked);

  void toggleAllItems() {
    final newState = !areAllItemsSelected;
    setState(() {
      for (var product in cartProducts) {
        product.isChecked = newState;
      }
    });
  }

  Future<void> deleteAllItems() async {
    if (cartProducts.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Your cart is already empty',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white),
          ),
          backgroundColor: Colors.orange,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    bool confirmDelete = await showDeleteAllConfirmationDialog(context);
    if (confirmDelete) {
      setState(() {
        isDeletingAll = true;
      });
      try {
        final apiService = ApiService();
        List<CartProduct> deletedProducts = List.from(cartProducts);

        // Delete all items from the server
        await Future.wait(cartProducts
            .map((product) => apiService.deleteCartItem(product.id)));

        setState(() {
          cartProducts.clear();
          isDeletingAll = false;
        });

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              'All items removed from cart',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.white),
            ),
            backgroundColor: Colors.green,
            behavior: SnackBarBehavior.floating,
            action: SnackBarAction(
              label: 'Undo',
              textColor: Colors.white,
              onPressed: () {
                restoreDeletedItems(deletedProducts);
              },
            ),
            duration: const Duration(seconds: 5),
          ),
        );
      } catch (e) {
        print('Error deleting all items: $e'); // For debugging
        setState(() {
          isDeletingAll = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Failed to delete all items: $e',
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white),
            ),
            backgroundColor: Colors.red,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  Future<void> restoreDeletedItems(List<CartProduct> deletedProducts) async {
    try {
      final apiService = ApiService();
      await Future.wait(deletedProducts.map((product) =>
          apiService.addToCart(product.menuItem.id, product.quantity)));
      setState(() {
        cartProducts.addAll(deletedProducts);
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            'Items successfully restored to cart',
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.white),
          ),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );
    } catch (e) {
      print('Error restoring items: $e'); // For debugging
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to restore items: $e'),
          backgroundColor: Colors.red,
        ),
      );
    }
  }

  Future<bool> showDeleteAllConfirmationDialog(BuildContext context) async {
    return await showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Confirm Deletion'),
              content: const Text(
                  'Are you sure you want to remove all items from your cart?'),
              actions: <Widget>[
                TextButton(
                  child: const Text(
                    'Delete All',
                    style: TextStyle(color: Colors.red),
                  ),
                  onPressed: () => Navigator.of(context).pop(true),
                ),
                TextButton(
                  child: const Text('Cancel'),
                  onPressed: () => Navigator.of(context).pop(false),
                ),
              ],
            );
          },
        ) ??
        false;
  }

  @override
  Widget build(BuildContext context) {
    double itemsTotal = cartProducts.fold(
        0,
        (sum, item) =>
            sum + (item.isChecked ? item.menuItem.price * item.quantity : 0));
    double discount = calculateDiscount(itemsTotal);
    double total = itemsTotal - discount;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Cart'),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 0,
        centerTitle: true,
      ),
      body: isLoading
          ? const Center(
              child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(),
                Text('Loading...'),
              ],
            ))
          : errorMessage.isNotEmpty
              ? Center(child: Text(errorMessage))
              : cartProducts.isEmpty
                  ? const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.shopping_cart_checkout,
                            size: 50,
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          Text('Your cart is empty'),
                        ],
                      ),
                    )
                  : Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              TextButton(
                                onPressed: toggleAllItems,
                                child: Text(
                                  areAllItemsSelected
                                      ? 'Deselect All'
                                      : 'Select All',
                                  style: const TextStyle(color: Colors.black),
                                ),
                              ),
                              isDeletingAll
                                  ? const SizedBox(
                                      width: 20,
                                      height: 20,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                      ),
                                    )
                                  : TextButton(
                                      onPressed: deleteAllItems,
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
                              return CartProductCard(
                                  product: cartProducts[index],
                                  onQuantityChanged: updateCartItemQuantity,
                                  onCheckedChanged: updateCartItemChecked);
                            },
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(16.0),
                          child: Column(
                            children: [
                              SummaryRow(
                                  label: 'Items',
                                  value: '₵${itemsTotal.toStringAsFixed(2)}'),
                              SummaryRow(
                                  label: 'Discount',
                                  value: '-₵${discount.toStringAsFixed(2)}'),
                              const Divider(),
                              SummaryRow(
                                  label: 'Amount to pay',
                                  value: '₵${total.toStringAsFixed(2)}'),
                              if (discount > 0)
                                Padding(
                                  padding: const EdgeInsets.only(top: 8.0),
                                  child: Text(
                                    'You saved ₵${discount.toStringAsFixed(2)}!',
                                    style: const TextStyle(
                                      color: Colors.green,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              const SizedBox(height: 10),
                              ElevatedButton(
                                onPressed:
                                    isPlacingOrder ? null : handleCheckout,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.orange,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 50, vertical: 15),
                                ),
                                child: isPlacingOrder
                                    ? const SizedBox(
                                        width: 20,
                                        height: 20,
                                        child: CircularProgressIndicator(
                                          valueColor:
                                              AlwaysStoppedAnimation<Color>(
                                                  Colors.white),
                                          strokeWidth: 2,
                                        ),
                                      )
                                    : const Text('Checkout'),
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

class CartProductCard extends StatefulWidget {
  final CartProduct product;
  final Function(CartProduct, int) onQuantityChanged;
  final Function(CartProduct, bool) onCheckedChanged;

  const CartProductCard({
    super.key,
    required this.product,
    required this.onQuantityChanged,
    required this.onCheckedChanged,
  });

  @override
  _CartProductCardState createState() => _CartProductCardState();
}

class _CartProductCardState extends State<CartProductCard> {
  void updateQuantity(int newQuantity) {
    widget.onQuantityChanged(widget.product, newQuantity);
    setState(() {});
  }

  void updateChecked(bool? value) {
    widget.onCheckedChanged(widget.product, value ?? false);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Checkbox(
            value: widget.product.isChecked,
            onChanged: updateChecked,
            activeColor: Colors.orange,
          ),
          Container(
            width: 60,
            height: 40,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                const BoxShadow(
                  color: Colors.white,
                  spreadRadius: 1,
                  blurRadius: 3,
                  offset: Offset(0, 2),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: CachedNetworkImage(
                imageUrl: widget.product.menuItem.categoryId,
                placeholder: (context, url) => Image.asset(placeHolderPath),
                errorWidget: (context, url, error) =>
                    Image.asset(placeHolderPath),
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.product.menuItem.name,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  widget.product.menuItem.description,
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[600],
                  ),
                ),
                const SizedBox(height: 5),
                Text(
                  widget.product.menuItem.price.toString(),
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
            onQuantityChanged: updateQuantity,
          ),
        ],
      ),
    );
  }
}

// class CartProductCard extends StatelessWidget {
//   final CartProduct product;

//   const CartProductCard({Key? key, required this.product}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Card(
//       margin: const EdgeInsets.all(8.0),
//       child: ListTile(
//         leading: Image.network(product.menuItem.imageUrl ?? 'placeholder_url'),
//         title: Text(product.menuItem.name),
//         subtitle: Text(product.menuItem.description),
//         trailing: Text('\$${product.menuItem.price.toStringAsFixed(2)}'),
//       ),
//     );
//   }
// }

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
              } else {
                // This will trigger the confirmation dialog
                onQuantityChanged(0);
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
              fontWeight: FontWeight.bold,
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
