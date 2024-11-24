import { Text, View, StyleSheet, Pressable } from "react-native";

import { useState } from "react";

import Fontisto from "@expo/vector-icons/Fontisto";

import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

export default function NotificationScreen() {
  const [isToggled, setIsToggled] = useState(false);

  const [notifToggle, setNotifToggle] = useState(false);
  const [calendarToggle, setCalendarToggle] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  const handleNotif = () => {
    setNotifToggle((prev) => !prev);
  };

  const handleCalendar = () => {
    setCalendarToggle((prev) => !prev);
  };
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.toggleContainer}>
          <Text style={styles.header}>Remind Me</Text>
          <Pressable onPress={handleNotif}>
            <Fontisto
              name={notifToggle ? "toggle-on" : "toggle-off"}
              size={35}
              color={notifToggle ? Color.purpleColor : Color.tagLine}
            />
          </Pressable>
        </View>
        <Text style={styles.description}>
          Get timely reminders for your medications, health updates, and alerts
          with our notification feature.
        </Text>

        <View style={[styles.toggleContainer, styles.subContainer]}>
          <Text style={styles.header}>Sync Calendar</Text>
          <Pressable onPress={handleCalendar}>
            <Fontisto
              name={calendarToggle ? "toggle-on" : "toggle-off"}
              size={35}
              color={calendarToggle ? Color.purpleColor : Color.tagLine}
            />
          </Pressable>
        </View>
        <Text style={styles.description}>
          Never miss an important date again. Sync your calendar to keep track
          of appointments, reminders, and events effortlessly across all your
          devices.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 18,
  },

  container: {
    marginTop: 30,
  },

  subContainer: {
    marginTop: 30,
  },

  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    fontFamily: Fonts.main,
    color: "#fff",
    fontSize: 18,
  },

  description: {
    fontFamily: Fonts.sub,
    color: "#fff",
    fontSize: 13,
    width: 300,
  },
});
