import { ThemedView } from '@/components/ThemedView';
import { useGetBySymbolCryptoQuery } from '@/services';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const [chartData, setChartData] = React.useState<any>({ labels: [], datasets: [{ data: [] }] });
  const { data: cryptoListData } = useGetBySymbolCryptoQuery(id as string);
  React.useEffect(() => {
    const labels: any[] = [];
    const datasets: any[] = [];
    const topTenData = Object.entries(cryptoListData?.data?.["Time Series (60min)"] || {}).slice(0, 10);
    /* First Data */
    const firstData: any = { data: [], strokeWidth: 2 }
    topTenData.forEach(([timestamp, data]: [string, any]) => {
      labels.push(timestamp);
      firstData.data.push(data["1. open"]);
    });
    datasets.push(firstData);
    setChartData({ labels: labels, datasets: datasets });
  }, [cryptoListData]);
  return (
    <ThemedView>
      {/* <ThemedText>{id}</ThemedText> */}
      <LineChart
        data={{
          labels: chartData?.labels || [],
          datasets: chartData?.datasets || [],
        }}
        height={Dimensions.get("window").height}
        width={Dimensions.get("window").width}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        }}
      />
    </ThemedView>
  );
}
