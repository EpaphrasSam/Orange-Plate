import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:mobile/auths/login_screen.dart';

Future<void> logout(BuildContext context) async {
  // Show confirmation dialog
  bool confirmLogout = await showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Confirm Logout'),
            content: Text('Are you sure you want to log out?'),
            actions: <Widget>[
              TextButton(
                child: Text('Cancel'),
                onPressed: () => Navigator.of(context).pop(false),
              ),
              TextButton(
                child: Text('Logout'),
                onPressed: () => Navigator.of(context).pop(true),
              ),
            ],
          );
        },
      ) ??
      false;

  // If user confirms, proceed with logout
  if (confirmLogout) {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('userId');
    await prefs.remove('userToken');
    await prefs.setBool('isLoggedIn', false);
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => OrangePlateLogin()),
    );
  }
}
// Call this function to logout
//  IconButton(
//             icon: Icon(Icons.exit_to_app),
//             onPressed: () {
//               logout(context);  // Call the logout function
//             },
//           ),
