// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen"; // Create this file in the next step
import AddAlertScreen from "./screens/AddAlertScreen";
import Settings from "./screens/Settings";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CommunityGuard" component={HomeScreen} />
        <Stack.Screen name="Add Alert" component={AddAlertScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
