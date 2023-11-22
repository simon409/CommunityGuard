import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const Settings = () => {
  const [maxDistance, setMaxDistance] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("maxDistance");
        if (value !== null) {
          setMaxDistance(value);
        }
      } catch (error) {
        console.log("Error getting max distance:", error);
      }
    };
    getData();
  }, []);
  const handleMaxDistanceChange = async () => {
    try {
      await AsyncStorage.setItem("maxDistance", maxDistance);
      console.log("Max distance updated successfully!");
    } catch (error) {
      console.log("Error updating max distance:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Change distance from your location (in meters)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter max distance"
        value={maxDistance}
        onChangeText={setMaxDistance}
      />
      <Button mode="elevated" onPress={handleMaxDistanceChange}>
        Save
      </Button>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
