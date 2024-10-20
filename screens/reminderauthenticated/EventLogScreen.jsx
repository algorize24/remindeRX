import { View, Text, StyleSheet, FlatList } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";
import FallHistory from "../../components/dashboard/FallHistory";
import TextScreen from "../../components/header/TextScreen";
export default function EventLogScreen() {
  const data = [
    {
      id: 1,
      date: new Date().toLocaleDateString(), // Gets the current date in a readable format
      time: new Date().toLocaleTimeString(), // Gets the current time in a readable format
      falldetails: "Severe fall detected",
    },

    {
      id: 2,
      date: new Date().toLocaleDateString(), // Gets the current date in a readable format
      time: new Date().toLocaleTimeString(), // Gets the current time in a readable format
      falldetails: "Severe fall detected",
    },

    {
      id: 3,
      date: new Date().toLocaleDateString(), // Gets the current date in a readable format
      time: new Date().toLocaleTimeString(), // Gets the current time in a readable format
      falldetails: "Severe fall detected",
    },

    {
      id: 4,
      date: new Date().toLocaleDateString(), // Gets the current date in a readable format
      time: new Date().toLocaleTimeString(), // Gets the current time in a readable format
      falldetails: "Severe fall detected",
    },

    {
      id: 5,
      date: new Date().toLocaleDateString(), // Gets the current date in a readable format
      time: new Date().toLocaleTimeString(), // Gets the current time in a readable format
      falldetails: "Severe fall detected",
    },
  ];
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Fall Detection History</TextScreen>
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.fall}>Fall Events: {data.length}</Text>
        <FlatList
          bounces={false}
          overScrollMode="never"
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FallHistory itemData={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
  },

  textContainer: {
    marginTop: 53,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },

  fall: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 16,
    marginBottom: 14,
  },
});
