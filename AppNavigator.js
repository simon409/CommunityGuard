// AppNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen"; // Create this file in the next step
import DetailsScreen from "./screens/DetailsScreen"; // Create this file in the next step

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CommunityGuard" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
