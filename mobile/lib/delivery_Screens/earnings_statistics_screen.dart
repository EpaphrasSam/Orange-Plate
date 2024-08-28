import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:mobile/functions/back_button_func.dart';

class EarningsStatisticsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Earnings Statistics'),
        leading: buildBackButton(context),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCards(),
            const SizedBox(height: 24),
            const Text('Earnings Overview',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            _buildEarningsChart(),
            const SizedBox(height: 20),
            _buildLegend(),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCards() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        _buildSummaryCard('This Week', '₵500', Icons.today),
        _buildSummaryCard('This Month', '₵2,000', Icons.calendar_today),
        _buildSummaryCard('This Year', '₵24,000', Icons.calendar_view_month),
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
            Icon(icon, size: 30, color: Colors.blue),
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

  Widget _buildEarningsChart() {
    return SizedBox(
      height: 300,
      child: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: 1000,
          barTouchData: BarTouchData(
            touchTooltipData: BarTouchTooltipData(
              getTooltipItem: (group, groupIndex, rod, rodIndex) {
                String timeFrame = _getTimeFrame(group.x.toDouble());
                return BarTooltipItem(
                  '$timeFrame\n',
                  const TextStyle(color: Colors.white),
                  children: <TextSpan>[
                    TextSpan(
                      text: '\₵${rod.toY.round()}',
                      style: const TextStyle(
                        color: Colors.yellow,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  return SideTitleWidget(
                    axisSide: meta.axisSide,
                    child: Text(_getTimeFrameShort(value.toInt()),
                        style: const TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        )),
                  );
                },
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 40,
                getTitlesWidget: (value, meta) {
                  return SideTitleWidget(
                    axisSide: meta.axisSide,
                    child: Text(
                      '\₵${value.toInt()}',
                      style: const TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          borderData: FlBorderData(show: false),
          barGroups: [
            BarChartGroupData(x: 0, barRods: [BarChartRodData(toY: 500)]),
            BarChartGroupData(x: 1, barRods: [BarChartRodData(toY: 450)]),
            BarChartGroupData(x: 2, barRods: [BarChartRodData(toY: 800)]),
            BarChartGroupData(x: 3, barRods: [BarChartRodData(toY: 750)]),
            BarChartGroupData(x: 4, barRods: [BarChartRodData(toY: 900)]),
            BarChartGroupData(x: 5, barRods: [BarChartRodData(toY: 850)]),
          ],
        ),
      ),
    );
  }

  Widget _buildLegend() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: const [
            _LegendItem(label: 'TW: This Week', color: Colors.blue),
            _LegendItem(label: 'LW: Last Week', color: Colors.blue),
            _LegendItem(label: 'TM: This Month', color: Colors.blue),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: const [
            _LegendItem(label: 'LM: Last Month', color: Colors.blue),
            _LegendItem(label: 'TY: This Year', color: Colors.blue),
            _LegendItem(label: 'LY: Last Year', color: Colors.blue),
          ],
        ),
      ],
    );
  }

  String _getTimeFrame(double x) {
    switch (x.toInt()) {
      case 0:
        return 'This Week';
      case 1:
        return 'Last Week';
      case 2:
        return 'This Month';
      case 3:
        return 'Last Month';
      case 4:
        return 'This Year';
      default:
        return 'Last Year';
    }
  }

  String _getTimeFrameShort(int x) {
    switch (x) {
      case 0:
        return 'TW';
      case 1:
        return 'LW';
      case 2:
        return 'TM';
      case 3:
        return 'LM';
      case 4:
        return 'TY';
      case 5:
        return 'LY';
      default:
        return '';
    }
  }
}

class _LegendItem extends StatelessWidget {
  final String label;
  final Color color;

  const _LegendItem({Key? key, required this.label, required this.color})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          width: 16,
          height: 16,
          color: color,
        ),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }
}
