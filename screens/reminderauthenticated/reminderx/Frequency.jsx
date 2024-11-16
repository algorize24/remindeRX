import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect } from "react";

// constants
import { Color } from "../../../constants/Color";
import { Fonts } from "../../../constants/Font";

// components
import AuthText from "../../../components/header/AuthText";

// context
import { useReminder } from "../../../context/reminderContext";

export default function Frequency({ navigation, route }) {
  // reminderContext
  const { medicationName, setFrequency, setSpecificDays } = useReminder();

  // data from IntervalRx.jsx
  const everyDay = route.params.everyday;

  // avoid flickering that's why we used useFocusEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  // // navigate to different screens
  const handleNavigate = (frequency) => {
    setFrequency(frequency);
    navigation.navigate(frequency, { frequency }); // pass frequency to the next screen
  };

  return (
    <View style={styles.root}>
      {everyDay ? (
        <>
          <AuthText style={styles.text}>How often do you take it?</AuthText>

          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Pressable
                onPress={() => handleNavigate("Once a day")}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Once a day</Text>
              </Pressable>
              <Pressable
                onPress={() => handleNavigate("Twice a day")}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Twice a day</Text>
              </Pressable>

              <Pressable
                onPress={() => handleNavigate("3 times a day")}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>3 times a day</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("SetInterval");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Every X hours</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : (
        <>
          <AuthText style={styles.text}>
            On which day(s) do you need to take your medicine?
          </AuthText>

          <View style={styles.container}>
            <View style={styles.subContainer}>
              <Pressable
                onPress={() => {
                  setSpecificDays(["Sunday"]), handleNavigate("Week");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Sunday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Sunday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Monday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Tuesday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Tuesday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Wednesday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Wednesday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Thursday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Thursday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Friday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Friday</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setSpecificDays(["Saturday"]), handleNavigate("Monday");
                }}
                style={({ pressed }) => [
                  styles.inputs,
                  pressed && styles.press,
                ]}
              >
                <Text style={styles.textInterval}>Saturday</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  press: {
    opacity: 0.7,
  },

  title: {
    fontFamily: Fonts.main,
    textTransform: "capitalize",
    color: "#fff",
    fontSize: 19,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 20,
  },

  subContainer: {
    marginTop: 30,
    marginHorizontal: 30,
  },

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  inputs: {
    backgroundColor: Color.bgColor,
    borderRadius: 8,
    marginTop: 10,
    padding: 12,
  },

  textInterval: {
    color: "#fff",
    fontFamily: Fonts.main,
  },
});
