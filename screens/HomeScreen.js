import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FAB as Fab } from "react-native-paper";
import { db } from "../config";
import { ref, onValue } from "firebase/database";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
  const [sortedAlerts, setSortedAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    onValue(alertsRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alerts = Object.values(data);
        const sorted = [...alerts].sort((a, b) => {
          if (a.danger === "High") return -1;
          if (a.danger === "Medium" && b.danger !== "High") return -1;
          return 1;
        });

        // Filter alerts based on user's location
        const filteredAlerts = await Promise.all(
          sorted.map(async (alert) => {
            const userLocation = await getUserLocation(); // Get user's location
            const alertLocation = {
              latitude: alert.latitude,
              longitude: alert.longitude,
            };
            const distance = calculateHaversineDistance(
              userLocation,
              alertLocation
            );
            const maxDistance = 200; // Maximum distance in meters

            console.log(distance);

            return distance <= maxDistance ? alert : null;
          })
        );

        const finalAlerts = filteredAlerts.filter((alert) => alert !== null);
        console.log(finalAlerts);
        setSortedAlerts(finalAlerts);
        setLoading(false); // Set loading to false after data is fetched
      }
    });
  }, []);

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // Haversine formula to calculate distance between two points on the Earth
  const calculateHaversineDistance = (coord1, coord2) => {
    const R = 6371000; // Radius of the Earth in meters

    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters

    return distance;
  };

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      return { latitude, longitude };
    } catch (error) {
      console.log("Error getting location", error);
    }
  };

  const renderAlert = ({ item }) => (
    <View
      style={{
        ...styles.alertContainer,
        backgroundColor:
          item.danger === "High"
            ? "#ff5b00"
            : item.danger === "Medium"
            ? "#ffc302"
            : "lightgrey",
      }}
    >
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <Text style={styles.alertDate}>
        {new Date(item.date).toUTCString().substring(0, 16)}
      </Text>
    </View>
  );

  if (loading) {
    // Render a loading indicator or placeholder
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 10,
            padding: 10,
          }}
        >
          Alerts
        </Text>
      </View>
      <FlatList
        data={sortedAlerts}
        numColumns={2}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
      />
      <Fab
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Add Alert")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  alertContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  alertImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  alertDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  alertDate: {
    fontSize: 12,
    color: "#000",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
