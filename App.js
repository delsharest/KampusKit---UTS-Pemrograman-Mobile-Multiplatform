import React from 'react';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './src/context/AppContext';
import { C } from './src/constants/theme';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import FocusScreen from './src/screens/FocusScreen';
import JournalScreen from './src/screens/JournalScreen';

const Tab = createBottomTabNavigator();
const icons = { Beranda: '🏠', Tugas: '✅', Fokus: '⏱️', Jurnal: '📖' };

export default function App() {
  return <SafeAreaProvider>
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: C.primary,
          tabBarInactiveTintColor: C.secondary,
          tabBarShowLabel: true,
          tabBarLabelStyle: styles.label,
          tabBarStyle: styles.tab,
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: focused ? 23 : 21 }}>
            {icons[route.name]}
          </Text>,
        })}>
          <Tab.Screen name="Beranda" component={HomeScreen} />
          <Tab.Screen name="Tugas" component={TasksScreen} />
          <Tab.Screen name="Fokus" component={FocusScreen} />
          <Tab.Screen name="Jurnal" component={JournalScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  </SafeAreaProvider>;
}

const styles = StyleSheet.create({
  tab: { height: 68, paddingTop: 7, paddingBottom: 6, backgroundColor: C.white,
    borderTopWidth: 1, borderTopColor: C.border },
  label: { fontSize: 10, fontWeight: '800', marginTop: 2 },
});
