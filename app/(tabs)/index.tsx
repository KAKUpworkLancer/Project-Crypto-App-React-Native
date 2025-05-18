
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetAllCryptoQuery } from '@/services';
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { push } = useRouter();
  const { data: cryptoListData } = useGetAllCryptoQuery();
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => push(`/details/${item.symbol}`)}
    >
      <ThemedText style={styles.menuText}>
        {item.name} ({item.symbol})
      </ThemedText>
    </TouchableOpacity>
  );
  /*
  const cryptoList = [{ symbol: 'BTC', name: 'Bitcoin' }, { symbol: 'ETH', name: 'Ethereum' }, { symbol: 'SOL', name: 'Solana' }, { symbol: 'BNB', name: 'BNB' }, { symbol: 'XRP', name: 'Ripple' }]
  */
  return (
    <ThemedView>
      <SafeAreaView>
        <FlatList
          style={{ height: '100%' }}
          data={cryptoListData?.data || []}
          keyExtractor={(item) => item?.symbol}
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
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 8,
  },
});
