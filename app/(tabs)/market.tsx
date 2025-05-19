import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { useGetBySymbolCryptoQuery } from '@/services';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function MarketDetailScreen() {
  const { id } = useLocalSearchParams();
  const [chartData, setChartData] = React.useState<any>({ labels: [], datasets: [{ data: [] }] });
  const [infoData, setInfoData] = React.useState<any>({ currentPrice: 0 });
  const [selectedPeriod, setSelectedPeriod] = React.useState('1D');
  const { data: cryptoListData } = useGetBySymbolCryptoQuery(id as string);

  React.useEffect(() => {
    const labels = ['10:00', '12:00', '14:00', '16:00', '18:00'];
    const datasets: any[] = [];
    const topTenData = Object.entries(cryptoListData?.data?.["Time Series (60min)"] || {}).slice(0, 10);

    const firstData: any = { data: [], strokeWidth: 2 }
    topTenData.forEach(([timestamp, data]: [string, any]) => {
      firstData.data.push(data["1. open"]);
    });
    setInfoData((current: any) => ({ ...current, currentPrice: firstData.data[0] }));
    firstData.data = firstData.data.reverse();
    datasets.push(firstData);
    setChartData({ labels, datasets: datasets });
  }, [cryptoListData]);

  const periods = ['1D', '1M', '1Y'];

  return (
    <ThemedView>
      <ThemedView>
        <ThemedText style={styles.titleSymbol}>{id}/USD</ThemedText>
        <ThemedText style={styles.subtitleCurrentPrice}>$ {infoData?.currentPrice}</ThemedText>

        <View style={styles.periodContainer}>
          <View style={styles.timePeriodsContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  selectedPeriod === period && styles.selectedPeriod
                ]}
                onPress={() => setSelectedPeriod(period)}
              >
                <ThemedText style={[
                  styles.periodText,
                  selectedPeriod === period && styles.selectedPeriodText
                ]}>
                  {period}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.periodButton}>
            <ThemedText style={styles.periodText}>BTC/USD</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            style={styles.chart}
            data={{
              labels: chartData?.labels || [],
              datasets: chartData?.datasets || [],
            }}
            height={Dimensions.get("window").height / 3 + 20}
            width={Dimensions.get("window").width - 20}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(128, 128, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726'
              },
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: 'rgba(128, 128, 128, 0.1)',
              },
              propsForLabels: {
                fontSize: 10,
                fill: 'gray',
              }
            }}
            bezier
            withDots={true}
            withShadow={true}
            withInnerLines={true}
            withOuterLines={true}
            withVerticalLines={false}
            withHorizontalLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            yAxisLabel="$"
            yAxisSuffix=""
            yAxisInterval={2}
            segments={5}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button type="buy" onPress={() => { }} />
          <Button type="sell" onPress={() => { }} />
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleSymbol: {
    paddingTop: 6,
    paddingLeft: 20,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  subtitleCurrentPrice: {
    padding: 8,
    paddingLeft: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "MontSerrat",
    color: 'red'
  },
  chart: {
    paddingTop: 10,
    paddingBottom: 8,
    marginHorizontal: 8,
  },
  chartContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 4,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  timePeriodsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 2,
    borderRadius: 10,
    backgroundColor: '#5196f4',
  },
  selectedPeriod: {
    backgroundColor: '#5196f4',
  },
  periodText: {
    fontSize: 10,
    color: 'lightgray',
  },
  selectedPeriodText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 10,
    marginBottom: 14,
  },
});
