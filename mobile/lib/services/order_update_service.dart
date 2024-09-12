import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:async';
import 'dart:convert';

class OrderUpdateService {
  WebSocketChannel? _channel;
  Function(dynamic)? onOrderUpdate;
  Timer? _reconnectionTimer;
  bool _isConnected = false;
  late String _userId;
  late String _userToken;

  Future<void> initializeWebSocket() async {
    final prefs = await SharedPreferences.getInstance();
    _userId = prefs.getString('userId') ?? '';
    _userToken = prefs.getString('userToken') ?? '';

    _connectWebSocket();
  }

  void _connectWebSocket() {
    final wsUrl =
        Uri.parse('https://orange-plate.onrender.com/ws/order=${_userId}');

    _channel = WebSocketChannel.connect(wsUrl);

    _channel!.stream.listen(
      (message) {
        print('Received order status update: $message');
        _isConnected = true;
        if (onOrderUpdate != null) {
          // Parse the message as JSON and pass it to the callback
          final jsonMessage = json.decode(message);
          if (jsonMessage['event'] == 'order-status') {
            onOrderUpdate!(jsonMessage['data']);
          }
        }
      },
      onError: (error) {
        print('WebSocket error: $error');
        _handleConnectionError();
      },
      onDone: () {
        print('WebSocket connection closed');
        _handleConnectionError();
      },
    );

    // Send authentication message
    _channel!.sink
        .add(json.encode({'type': 'authentication', 'token': _userToken}));
  }

  void _handleConnectionError() {
    _isConnected = false;
    _scheduleReconnection();
  }

  void _scheduleReconnection() {
    _reconnectionTimer?.cancel();
    _reconnectionTimer = Timer(const Duration(seconds: 5), () {
      if (!_isConnected) {
        print('Attempting to reconnect...');
        _connectWebSocket();
      }
    });
  }

  void setOrderUpdateCallback(Function(dynamic) callback) {
    onOrderUpdate = callback;
  }

  void dispose() {
    _channel?.sink.close();
    _reconnectionTimer?.cancel();
  }
}
