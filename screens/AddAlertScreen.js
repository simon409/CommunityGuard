import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import { AnimatedMapView } from "react-native-maps/lib/MapView";
import { MarkerAnimated } from "react-native-maps";
import * as Location from "expo-location";
import { db } from "../config";
import { ref, set, push } from "firebase/database";

const AddAlertScreen = () => {
  const [alertText, setAlertText] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [alertDanger, setAlertDanger] = useState("Low");
  const [alertDate, setAlertDate] = useState(new Date().toISOString());
  const [latitude, setLatitude] = useState(48.858844);
  const [longitude, setLongitude] = useState(2.29435);

  useEffect(() => {
    getLocation();

    console.log("Get location");
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      console.log(location);
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const handleAlertTextChange = (text) => {
    setAlertText(text);
  };

  const handleAlertDescrionChange = (text) => {
    setAlertDescription(text);
  };

  const handleLocationSelect = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLatitude(latitude);
    setLongitude(longitude);
    console.log(latitude, longitude);
  };

  const handleAddAlert = () => {
    console.log("Add alert");
    push(ref(db, "alerts/"), {
      title: alertText,
      description: alertDescription,
      danger: alertDanger,
      date: alertDate,
      latitude: latitude,
      longitude: longitude,
    });
    setAlertText("");
    setAlertDescription("");
    setAlertDanger("Low");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Alert Text:</Text>
      <TextInput
        style={styles.input}
        value={alertText}
        placeholder="Enter alert text"
        onChangeText={handleAlertTextChange}
      />
      <TextInput
        style={styles.input}
        value={alertDescription}
        placeholder="Enter alert description"
        onChangeText={handleAlertDescrionChange}
      />
      <Text style={styles.label}>Danger:</Text>
      <Picker
        style={styles.picker}
        selectedValue={alertDanger}
        onValueChange={setAlertDanger}
      >
        <Picker.Item label="Low" value="Low" />
        <Picker.Item label="Medium" value="Medium" />
        <Picker.Item label="High" value="High" />
      </Picker>
      <Text style={styles.label}>Location:</Text>

      <View style={styles.buttons}>
        <AnimatedMapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={handleLocationSelect}
          style={{ width: "100%", height: 300 }}
        >
          <MarkerAnimated
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </AnimatedMapView>
        <Button
          title="Add Alert"
          onPress={handleAddAlert}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  buttons: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    padding: 8,
    borderRadius: 8,
    elevation: 0,
    shadowOpacity: 0,
  },
  picker: {
    marginBottom: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
});

export default AddAlertScreen;
