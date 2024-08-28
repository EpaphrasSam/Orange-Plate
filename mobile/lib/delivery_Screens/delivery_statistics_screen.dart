import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:mobile/functions/back_button_func.dart';

class DeliveryStatsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Statistics'),
        leading: buildBackButton(context),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCards(),
            const SizedBox(height: 24),
            const Text('Weekly Earnings',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: _buildWeeklyEarningsChart(),
            ),
            const SizedBox(height: 24),
            const Text('Delivery Types',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 30),
            Builder(
                builder: (context) => Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: _buildDeliveryTypePieChart(context),
                    )),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCards() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _buildSummaryCard('Total Deliveries', '156', Icons.delivery_dining),
        _buildSummaryCard('This Month', '₵1,250', Icons.attach_money),
        _buildSummaryCard('Rating', '4.8', Icons.star),
      ],
    );
  }

  Widget _buildSummaryCard(String title, String value, IconData icon) {
    return Card(
      elevation: 4,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            Icon(icon, size: 30, color: Colors.orange),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 14)),
            const SizedBox(height: 4),
            Text(value,
                style:
                    const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildWeeklyEarningsChart() {
    return Container(
      height: 200,
      child: LineChart(
        LineChartData(
          gridData: const FlGridData(show: false),
          titlesData: FlTitlesData(
            leftTitles:
                const AxisTitles(sideTitles: SideTitles(showTitles: false)),
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  String text;
                  switch (value.toInt()) {
                    case 0:
                      text = 'Mon';
                      break;
                    case 1:
                      text = 'Tue';
                      break;
                    case 2:
                      text = 'Wed';
                      break;
                    case 3:
                      text = 'Thu';
                      break;
                    case 4:
                      text = 'Fri';
                      break;
                    case 5:
                      text = 'Sat';
                      break;
                    case 6:
                      text = 'Sun';
                      break;
                    default:
                      text = '';
                  }
                  return Text(text,
                      style: const TextStyle(color: Colors.black));
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: false),
          minX: 0,
          maxX: 6,
          minY: 0,
          maxY: 200,
          lineBarsData: [
            LineChartBarData(
              spots: [
                const FlSpot(0, 50),
                const FlSpot(1, 80),
                const FlSpot(2, 120),
                const FlSpot(3, 70),
                const FlSpot(4, 100),
                const FlSpot(5, 150),
                const FlSpot(6, 90),
              ],
              isCurved: true,
              color: Colors.orange,
              barWidth: 3,
              dotData: const FlDotData(show: false),
              belowBarData: BarAreaData(
                  show: true, color: Colors.orange.withOpacity(0.3)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDeliveryTypePieChart(BuildContext context) {
    final deliveryTypes = [
      {'type': 'Standard', 'percentage': 40, 'color': Colors.blue},
      {'type': 'Express', 'percentage': 30, 'color': Colors.green},
      {'type': 'Same-day', 'percentage': 30, 'color': Colors.red},
    ];

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        SizedBox(
          width: 150, // Reduce the width of the chart
          height: 150, // Reduce the height of the chart
          child: PieChart(
            PieChartData(
              sections: deliveryTypes
                  .map((type) => PieChartSectionData(
                        value: (type['percentage'] as int)
                            .toDouble(), // Cast to double
                        color: type['color'] as Color,
                        title: '',
                        radius: 60, // Reduce the radius
                        showTitle: false,
                      ))
                  .toList(),
              sectionsSpace: 0,
              centerSpaceRadius: 30, // Reduce the center space
              pieTouchData: PieTouchData(
                touchCallback: (FlTouchEvent event, pieTouchResponse) {
                  if (event is FlTapUpEvent &&
                      pieTouchResponse?.touchedSection != null) {
                    final index =
                        pieTouchResponse!.touchedSection!.touchedSectionIndex;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                          content: Text(
                        '${deliveryTypes[index]['type']}: ${deliveryTypes[index]['percentage']}%',
                        textAlign: TextAlign.center,
                      )),
                    );
                  }
                },
              ),
            ),
          ),
        ),
        const SizedBox(width: 30),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: deliveryTypes
                .map((type) => Padding(
                      padding: const EdgeInsets.symmetric(vertical: 4),
                      child: Row(
                        children: [
                          Container(
                            width: 16,
                            height: 16,
                            color: type['color'] as Color,
                          ),
                          const SizedBox(width: 8),
                          Text('${type['type']}: ${type['percentage']}%'),
                        ],
                      ),
                    ))
                .toList(),
          ),
        ),
      ],
    );
  }

  Widget buildEarningsChart(BuildContext context) {
    return Container(
      height: 200,
      child: Text('Earnings chart placeholder'),
      // Implement your earnings chart here
    );
  }
}
