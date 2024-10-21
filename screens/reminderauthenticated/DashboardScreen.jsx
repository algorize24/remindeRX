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
      <FallDetection onToggle={handleToggle} />
      {/*fix soon, limited only to 3, fix when we have db and context */}
      {isToggle ? (
        <ScrollView>
          {limitedHistory.map((item, index) => (
            <FallHistory key={index} itemData={item} />
          ))}
          {data.length > 3 && (
            <Text onPress={() => {}} style={styles.text}>
              View more...
            </Text>
          )}
        </ScrollView>
      ) : (
        <View style={styles.toggle}>
          <Text style={styles.historyText}>
            Please enable Fall Detection System to view the history.
          </Text>
        </View>
      )}

      <Chatbot onPress={() => navigation.navigate("Chatbot")} />
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
    fontFamily: Fonts.sub,
    fontSize: 13,
  },
});
