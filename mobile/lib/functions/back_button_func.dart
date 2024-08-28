import 'package:flutter/material.dart';

Widget buildBackButton(BuildContext context) {
  return IconButton(
    icon: const Icon(Icons.arrow_back_ios, color: Colors.black),
    onPressed: () {
      Navigator.pop(context);
    },
  );
}

//  Calling the function
//   leading: buildBackButton(context), (on the appbar)