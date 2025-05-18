import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
        headerShown: true,
        headerTitleAlign: route.name === 'index' ? 'left' : 'center',
        headerTitle: route.name === 'index' ? 'StockPedia' : 'Company Details',
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

        // If index, only render title and right icon
        // headerLeft: () =>
        //   route.name !== 'index' ? (
        //     <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
        //       <Ionicons name="arrow-back" size={24} color={Colors[colorScheme ?? 'light'].tint} />
        //     </TouchableOpacity>
        //   ) : null,

        headerRight: () => (
          <TouchableOpacity onPress={() => console.log('Navigation menu pressed')} style={{ marginRight: 16 }}>
            <Ionicons name="menu" size={24} color='white' />
          </TouchableOpacity>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wallet.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: 'Market',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="market.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="profile.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
