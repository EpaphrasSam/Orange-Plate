import 'package:flutter/material.dart';
import 'package:mobile/functions/back_button_func.dart';

class DeliveryProfileScreen extends StatelessWidget {
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
              MaterialPageRoute(builder: (_) => EditProfileScreen()),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 60,
              backgroundImage: AssetImage('assets/man.jpg'),
            ),
            const SizedBox(height: 16),
            const Text(
              'Chris Johnson',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text('Active since: January 2023'),
            const SizedBox(height: 24),
            _buildInfoCard('Phone', '+1 234 567 8900'),
            _buildInfoCard('Email', 'chris.johnson@example.com'),
            _buildInfoCard('Vehicle', 'Toyota Corolla'),
            _buildInfoCard('License Plate', 'ABC 123'),
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
}

class EditProfileScreen extends StatefulWidget {
  @override
  _EditProfileScreenState createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  // Add controllers for each editable field
  final _nameController = TextEditingController(text: 'Chris Johnson');
  final _phoneController = TextEditingController(text: '+1 234 567 8900');
  final _emailController =
      TextEditingController(text: 'chris.johnson@example.com');
  final _vehicleController = TextEditingController(text: 'Toyota Corolla');
  final _licensePlateController = TextEditingController(text: 'ABC 123');

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
              controller: _vehicleController,
              decoration: const InputDecoration(labelText: 'Vehicle'),
            ),
            TextFormField(
              controller: _licensePlateController,
              decoration: const InputDecoration(labelText: 'License Plate'),
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
    _vehicleController.dispose();
    _licensePlateController.dispose();
    super.dispose();
  }
}
