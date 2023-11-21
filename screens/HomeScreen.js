import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FAB as Fab } from "react-native-paper";

const alerts = [
  {
    id: 1,
    title: "Tornado alert",
    description: "There is a tornado close to your location",
    date: "Mon Nov 20 2023",
    danger: "High",
  },
  {
    id: 2,
    title: "Fire alert",
    description: "House on fire close to your location",
    date: "Mon Nov 27 2023",
    danger: "Medium",
  },
  {
    id: 3,
    title: "Alert 2",
    description: "This is alert 2",
    date: "Mon Nov 27 2023",
    danger: "Low",
  },
];

function HomeScreen({ navigation }) {
  const [sortedAlerts, setSortedAlerts] = useState(alerts);
  useEffect(() => {
    // Sort the alerts array by dangerconst sortByDanger = () => {
    const sorted = [...sortedAlerts].sort((a, b) => {
      if (a.danger === "High") return -1;
      if (a.danger === "Medium" && b.danger !== "High") return -1;
      return 1;
    });
    setSortedAlerts(sorted);
  }, [alerts]);

  const renderAlert = ({ item }) => (
    <View
      style={{
        ...styles.alertContainer,
        backgroundColor:
          item.danger === "High"
            ? "#ff5b00"
            : item.danger == "Medium"
            ? "#ffc302"
            : "lightgrey",
      }}
    >
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <Text style={styles.alertDate}>{item.date}</Text>
    </View>
  );

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
        keyExtractor={(item) => item.id.toString()}
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
