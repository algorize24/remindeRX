import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import TextScreen from "../../components/header/TextScreen";
import Label from "../../components/dashboard/Label";
import { FlatList } from "react-native-gesture-handler";
export default function ReminderScreen() {
  // const reminderData = [
  //   {
  //     id: 1,
  //     name: "Biogesic",
  //     img: require("../../assets/medicine.webp"),
  //     qty: "1",
  //     dosage: "500",
  //     duration: [
  //       {
  //         time: '7',

  //       }
  //     ]
  //   },
  // ];
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Medication Reminder</TextScreen>
      </View>

      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            console.log("test");
          }}
        >
          Lists of Reminder
        </Label>

        <FlatList overScrollMode="never" bounces={false} data />
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
});
