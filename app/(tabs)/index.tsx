
import CardComponent from '@/components/StockCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { companiesList } from '@/constants/StockList';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { push } = useRouter();

  const renderItem = ({ item }: any) => {
    const percentageChange = ((item.value / 100) * 5).toFixed(2); // Example calculation for percentage

    return (
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => push(`/details/${item.symbol}`)}
      >
        {/* Row 1: Company Symbol and Price */}
        <View style={{ textAlign: 'left' }}>
          <ThemedText style={styles.symbol}>{item.symbol}</ThemedText>
          <ThemedText style={styles.name}>{item.name}</ThemedText>

        </View>

        {/* Row 2: Company Name and Percentage Change */}
        <View style={styles.spacing}>
          <ThemedText style={styles.price}>${item.value.toFixed(2)}</ThemedText>

          <View style={styles.row}>
            <MaterialIcons name="trending-up" size={24} color={item.color} />
            <ThemedText style={[styles.percentage, { color: item.color, textAlign: 'right' }]}>
              {percentageChange}%
            </ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView
      style={{ marginBottom: 80 }}
    >
      <SafeAreaView>
        {/* Display Two Cards */}
        <View style={styles.cardContainer}>
          <CardComponent title="Total Market Cap" value="$1.2 Trillion" />
          <CardComponent title="Top Gainer" value="Tesla (TSLA) +12%" />
        </View>

        {/* List Title */}
        <ThemedText style={styles.title}>Market</ThemedText>

        <FlatList
          style={{ height: '100%' }}
          data={companiesList}
          keyExtractor={(item) => item.symbol}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 2,
    backgroundColor: '#eee',
    marginLeft: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spacing: {
    justifyContent: 'space-between',
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    color: '#777',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 14,
  },
});
