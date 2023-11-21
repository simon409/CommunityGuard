import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FAB as Fab } from "react-native-paper";
import { db } from "../config";
import { ref, onValue } from "firebase/database";

function HomeScreen({ navigation }) {
  const [sortedAlerts, setSortedAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const alertsRef = ref(db, "alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alerts = Object.values(data);
        const sorted = [...alerts].sort((a, b) => {
          if (a.danger === "High") return -1;
          if (a.danger === "Medium" && b.danger !== "High") return -1;
          return 1;
        });
        setSortedAlerts(sorted);
        setLoading(false); // Set loading to false after data is fetched
      }
    });
  }, []);

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
