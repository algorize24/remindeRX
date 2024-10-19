import { View, Text, StyleSheet, Image } from "react-native";
import { Color } from "../../constants/Color";

import Userprofile from "../../components/dashboard/Userprofile";
import Realtime from "../../components/dashboard/Realtime";

export default function DashboardScreen() {
  return (
    <View style={styles.root}>
      <Userprofile />

      <View style={styles.dataContainer}>
        <Realtime
          name={"heartbeat-alt"}
          size={42}
          title={"Heart Rate"}
          num={"72"}
          label={"bpm"}
        />

        <Realtime
          name={"blood-drop"}
          size={32}
          title={"Blood Pressure"}
          num={"120 / 80"}
          label={"mmhg"}
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

  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
