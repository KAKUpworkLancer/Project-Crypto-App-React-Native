import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetBySymbolCryptoQuery } from '@/services';
import dayjs from 'dayjs';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [chartData, setChartData] = React.useState<any>({ labels: [], datasets: [{ data: [] }] });
  const [infoData, setInfoData] = React.useState<any>({ currentPrice: 0 });
  const { data: cryptoListData } = useGetBySymbolCryptoQuery(id as string);
  React.useEffect(() => {
    const labels: any[] = [];
    const datasets: any[] = [];
    const topTenData = Object.entries(cryptoListData?.data?.["Time Series (60min)"] || {}).slice(0, 10);
    /* First Data */
    const firstData: any = { data: [], strokeWidth: 2 }
    topTenData.forEach(([timestamp, data]: [string, any]) => {
      labels.push(dayjs(timestamp).format("HH:mm"));
      firstData.data.push(data["1. open"]);
    });
    setInfoData((current: any) => ({ ...current, currentPrice: firstData.data[0] }));
    firstData.data = firstData.data.reverse();
    datasets.push(firstData);
    setChartData({ labels: labels.reverse(), datasets: datasets });
  }, [cryptoListData]);
  return (
    <ThemedView>
      <ThemedView>
        <ThemedText style={styles.titleSymbol}>{id}</ThemedText>
        <ThemedText style={styles.subtitleCurrentPrice}>$ {infoData?.currentPrice}</ThemedText>
        <LineChart
          style={styles.chart}
          data={{
            labels: chartData?.labels || [],
            datasets: chartData?.datasets || [],
          }}
          height={Dimensions.get("window").height / 3}
          width={Dimensions.get("window").width}
          chartConfig={{
            backgroundColor: 'black',
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'black',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
        />
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
    padding: 24,
    textAlign: 'center',
    fontSize: 24,
  },
  subtitleCurrentPrice: {
    padding: 24,
    textAlign: 'center',
    fontSize: 40,
  },
  chart: {
    paddingTop: 24,
    paddingBottom: 24,
  }
});
