import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const alerts = [
  {
    id: 1,
    title: "Tornado alert",
    description: "There is a tornado alert close to your location",
    date: "Mon Nov 20 2023",
  },
  {
    id: 2,
    title: "Alert 2",
    description: "This is alert 2",
    date: "Mon Nov 27 2023",
  },
];

function HomeScreen({ navigation }) {
  const renderAlert = ({ item }) => (
    <View style={styles.alertContainer}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <Text style={styles.alertDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        numColumns={2}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("Details")}
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
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: "#888",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
