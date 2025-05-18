import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout() {
  const queryClient = new QueryClient()
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-VariableFont_wght.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="details" options={{ headerShown: false }} />
          <Stack.Screen
            name="details/[id]"
            options={{
              headerTitle: 'Chart',
              headerTitleAlign: 'center', // Center aligns the title
              headerStyle: {
                backgroundColor: '#3171F0',
                borderBottomWidth: 2,
                borderBottomColor: '#007bff', // Slightly darker blue separator
              },
              headerTitleStyle: {
                fontSize: 22,
                fontWeight: 'bold',
                color: '#fff',
                fontFamily: 'MontSerrat',
              },
              headerTintColor: '#fff', // Changes back button & icons color
              headerRight: () => (
                <TouchableOpacity onPress={() => console.log('Navigation icon pressed')} style={{ marginRight: 16 }}>
                  <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
