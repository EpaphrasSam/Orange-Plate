import 'package:flutter/material.dart';
import 'package:mobile/models/user_model.dart';
import 'package:mobile/services/api_services.dart';
import 'package:mobile/screens/order_history_screen.dart';
import 'package:mobile/global_state.dart';

class UserProfileScreen extends StatefulWidget {
  @override
  _UserProfileScreenState createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  UserModel? user;
  bool isLoading = true;
  final GlobalState _globalState = GlobalState();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    fetchUserProfile();
  }

  Future<void> fetchUserProfile() async {
    try {
      final apiService = ApiService();
      final userId = await apiService.getUserId();
      if (userId == null) {
        throw Exception('User ID not found');
      }
      final fetchedUser = await apiService.fetchUserProfile();
      setState(() {
        user = fetchedUser;
        isLoading = false;
      });
    } catch (e) {
      print('Failed to fetch user profile: $e');
      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : CustomScrollView(
              slivers: [
                SliverAppBar(
                  expandedHeight: 200.0,
                  floating: false,
                  pinned: true,
                  flexibleSpace: FlexibleSpaceBar(
                    title: Text(user?.name ?? 'User Profile'),
                    background: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topRight,
                          end: Alignment.bottomLeft,
                          colors: [Colors.blue, Colors.teal],
                        ),
                      ),
                      child: Center(
                        child: CircleAvatar(
                          radius: 50,
                          backgroundColor: Colors.white,
                          child: Text(
                            user?.name.substring(0, 1).toUpperCase() ?? 'U',
                            style: TextStyle(fontSize: 40, color: Colors.blue),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                SliverToBoxAdapter(
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Card(
                          elevation: 4,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                _buildInfoRow(
                                    Icons.email, user?.email ?? 'N/A'),
                                SizedBox(height: 8),
                                _buildInfoRow(
                                    Icons.phone, user?.phone ?? 'N/A'),
                                SizedBox(height: 8),
                                _buildInfoRow(
                                    Icons.location_on, user?.address ?? 'N/A'),
                              ],
                            ),
                          ),
                        ),
                      ),
                      TabBar(
                        controller: _tabController,
                        tabs: [
                          Tab(text: 'Order History'),
                          Tab(text: 'Settings'),
                        ],
                      ),
                    ],
                  ),
                ),
                SliverFillRemaining(
                  child: TabBarView(
                    controller: _tabController,
                    children: [
                      OrderHistoryScreen(),
                      Center(
                          child: Text('Settings')), // Placeholder for settings
                    ],
                  ),
                ),
              ],
            ),
    );
  }

  Widget _buildInfoRow(IconData icon, String text) {
    return Row(
      children: [
        Icon(icon, color: Colors.blue),
        SizedBox(width: 8),
        Text(text, style: TextStyle(fontSize: 16)),
      ],
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }
}
