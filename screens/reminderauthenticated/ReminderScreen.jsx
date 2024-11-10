import { View, StyleSheet, FlatList } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

// component
import CalendarList from "../../components/dashboard/CalendarList";
import MainButton from "../../components/buttons/MainButton";
import ReminderContainer from "../../components/dashboard/ReminderContainer";
import IsEmpty from "../../components/dashboard/isEmpty";

const fakeData = [
  {
    id: 1,
    image: require("../../assets/others/pill.png"),
    medicine_name: "Biogesic",
    pills: "1",
    time: "7:00am",
  },
  {
    id: 2,
    image: require("../../assets/others/pill.png"),
    medicine_name: "Biogesic",
    pills: "1",
    time: "8:00am",
  },
];

export default function ReminderScreen({ navigation }) {
  return (
    <View style={styles.root}>
      <CalendarList />

      {fakeData.length === 0 ? (
        <IsEmpty />
      ) : (
        <FlatList
          alwaysBounceVertical={false}
          bounces={false}
          overScrollMode="never"
          data={fakeData}
          renderItem={({ item }) => <ReminderContainer itemData={item} />}
          keyExtractor={(item) => item.id}
        />
      )}

      <MainButton
        onPress={() => navigation.navigate("AddReminder")}
        style={styles.button}
      >
        Add Reminder
      </MainButton>
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
    marginTop: 20,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },

  button: {
    marginVertical: 30,
  },

  textLength: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: Fonts.main,
    textAlign: "center",
    color: Color.tagLine,
  },
});
