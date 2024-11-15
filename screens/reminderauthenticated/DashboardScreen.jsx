import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import FallDetection from "../../components/dashboard/FallDetection";
import FallHistory from "../../components/dashboard/FallHistory";
import Userprofile from "../../components/dashboard/Userprofile";
import Realtime from "../../components/dashboard/Realtime";
import Chatbot from "../../components/dashboard/Chatbot";

export default function DashboardScreen({ data = [] }) {
  const [isToggle, setIsToggle] = useState(false);

  const navigation = useNavigation();

  const handleToggle = (toggleState) => {
    setIsToggle(toggleState);
  };

  // Slice data to show only the first 3 fall history items
  const limitedHistory = Array.isArray(data) ? data.slice(0, 3) : [];
  return (
    <View style={styles.root}>
      <Userprofile />
      <View style={styles.dataContainer}>
        <Realtime
          name={"heartbeat-alt"}
          size={42}
          title={"Pulse Rate"}
          num={"72"}
          label={"bpm"}
        />

        <Realtime
          name={"blood-drop"}
          size={32}
          title={"Glucose"}
          num={"90"}
          label={"mg/dL"}
        />
      </View>

      <View style={styles.dataContainer}>
        <Realtime size={42} title={"Temperature"} num={"72"} label={"°C"} />

        <Realtime
          name={"blood-drop"}
          size={32}
          title={"Oxygen Sat'"}
          num={"90"}
          label={"%"}
        />
      </View>

      <View style={styles.chatView}>
        <Chatbot onPress={() => navigation.navigate("Chatbot")} />
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
    marginTop: 10,
  },

  text: {
    color: Color.tagLine,
    marginTop: 20,
    paddingLeft: 5,
  },

  toggle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  historyText: {
    textAlign: "center",
    color: Color.tagLine,
    fontFamily: Fonts.main,
    fontSize: 13,
  },

  chatView: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
