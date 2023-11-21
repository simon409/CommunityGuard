// AppNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen"; // Create this file in the next step
import AddAlertScreen from "./screens/AddAlertScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CommunityGuard" component={HomeScreen} />
      <Stack.Screen name="Add Alert" component={AddAlertScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
