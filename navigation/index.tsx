import React, { FunctionComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import { HomeScreen } from '../screens/HomeScreen';
import { PlannerScreen } from '../screens/PlannerScreen';
import { WorkoutDetailScreen } from '../screens/WorkoutDetailScreen';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

interface RootNavigatorProps {}

const Stack = createNativeStackNavigator();

const RootNavigator: FunctionComponent<RootNavigatorProps> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ title: 'Workout Info' }}
      />
    </Stack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName="Home">
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="home" size={size} color={color} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="calendar" size={size} color={color} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
};
