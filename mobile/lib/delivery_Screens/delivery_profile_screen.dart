import 'package:flutter/material.dart';
import 'package:mobile/functions/back_button_func.dart';
import 'package:mobile/services/api_services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:geolocator/geolocator.dart';

class DeliveryProfileScreen extends StatefulWidget {
  @override
  _DeliveryProfileScreenState createState() => _DeliveryProfileScreenState();
}

class _DeliveryProfileScreenState extends State<DeliveryProfileScreen> {
  final ApiService apiService = ApiService();
  Map<String, dynamic> riderData = {};
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadRiderData();
  }

  Future<void> _loadRiderData() async {
    try {
      Position position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      Map<String, dynamic> data = await apiService.fetchRiderHome(
        position.latitude,
        position.longitude,
      );

      setState(() {
        riderData = data['rider'];
        isLoading = false;
      });
    } catch (e) {
      print('Error loading rider data: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
        leading: buildBackButton(context),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (_) => EditProfileScreen(riderData: riderData)),
            ),
          ),
        ],
      ),
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  CircleAvatar(
                    radius: 60,
                    backgroundImage: AssetImage(
                        'assets/man.jpg'), // Consider using a network image if available
                  ),
                  const SizedBox(height: 16),
                  Text(
                    riderData['name'] ?? 'Name not available',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 8),
                  Text('Active since: ${_formatDate(riderData['createdAt'])}'),
                  const SizedBox(height: 24),
                  _buildInfoCard(
                      'Phone', riderData['phone'] ?? 'Not available'),
                  _buildInfoCard(
                      'Email', riderData['email'] ?? 'Not available'),
                  _buildInfoCard('Vehicle Type',
                      riderData['vehicle_type'] ?? 'Not available'),
                  _buildInfoCard('License Number',
                      riderData['lincenseNumber'] ?? 'Not available'),
                  _buildInfoCard('Vehicle Number',
                      riderData['vehicleNumber'] ?? 'Not available'),
                  _buildInfoCard(
                      'Availability',
                      riderData['availability']
                          ? 'Available'
                          : 'Not Available'),
                ],
              ),
            ),
    );
  }

  Widget _buildInfoCard(String title, String value) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: ListTile(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        subtitle: Text(value),
      ),
    );
  }

  String _formatDate(String? dateString) {
    if (dateString == null) return 'Date not available';
    DateTime date = DateTime.parse(dateString);
    return '${date.day}/${date.month}/${date.year}';
  }
}

class EditProfileScreen extends StatefulWidget {
  final Map<String, dynamic> riderData;

  EditProfileScreen({required this.riderData});

  @override
  _EditProfileScreenState createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  late TextEditingController _nameController;
  late TextEditingController _phoneController;
  late TextEditingController _emailController;
  late TextEditingController _vehicleTypeController;
  late TextEditingController _licenseNumberController;
  late TextEditingController _vehicleNumberController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.riderData['name']);
    _phoneController = TextEditingController(text: widget.riderData['phone']);
    _emailController = TextEditingController(text: widget.riderData['email']);
    _vehicleTypeController =
        TextEditingController(text: widget.riderData['vehicle_type']);
    _licenseNumberController =
        TextEditingController(text: widget.riderData['lincenseNumber']);
    _vehicleNumberController =
        TextEditingController(text: widget.riderData['vehicleNumber']);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Edit Profile')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(labelText: 'Name'),
            ),
            TextFormField(
              controller: _phoneController,
              decoration: const InputDecoration(labelText: 'Phone'),
            ),
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(labelText: 'Email'),
            ),
            TextFormField(
              controller: _vehicleTypeController,
              decoration: const InputDecoration(labelText: 'Vehicle Type'),
            ),
            TextFormField(
              controller: _licenseNumberController,
              decoration: const InputDecoration(labelText: 'License Number'),
            ),
            TextFormField(
              controller: _vehicleNumberController,
              decoration: const InputDecoration(labelText: 'Vehicle Number'),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                // Implement save logic here
                Navigator.pop(context);
              },
              child: const Text('Save Changes'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    _vehicleTypeController.dispose();
    _licenseNumberController.dispose();
    _vehicleNumberController.dispose();
    super.dispose();
  }
}
