// App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator"; // Create this file in the next step

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
