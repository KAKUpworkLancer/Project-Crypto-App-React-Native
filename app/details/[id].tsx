
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <ThemedView>
      {/* <ThemedText>{id}</ThemedText> */}
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [120, 90, 100, 140, 80, 160, 130],
              strokeWidth: 2,
            },
          ],
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
