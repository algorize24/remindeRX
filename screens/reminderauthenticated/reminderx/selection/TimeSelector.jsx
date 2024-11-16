import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect } from "react";

// constants
import { Color } from "../../../../constants/Color";
import { Fonts } from "../../../../constants/Font";

// component
import TimePicker from "../../../../components/dashboard/TimePicker";
import MainButton from "../../../../components/buttons/MainButton";
import AuthText from "../../../../components/header/AuthText";

// context
import { useReminder } from "../../../../context/reminderContext";

// icon
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TimeSelector({
  navigation,
  header,
  onNext,
  routeReview,
}) {
  const { medicationName, pillCount } = useReminder();

  // Header title logic
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.title}>{medicationName && medicationName}</Text>
      ),
    });
  }, [navigation, medicationName]);

  const handleRouting = () => {
    if (onNext) {
      // Call the onNext handler to determine the flow
      onNext();
    } else if (routeReview) {
      // Navigate to Review screen
      navigation.navigate("Review");
    } else {
      // Navigate to SetReminder screen
      navigation.navigate("SetReminder");
    }
  };

  return (
    <View style={styles.root}>
      <AuthText style={styles.text}>{header}</AuthText>

      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.containerHeader}>
            <Text style={styles.textContainer}>Take</Text>
            <Text style={styles.textContainer}>{pillCount} Pill(s)</Text>
            <Pressable
              onPress={() => {
                navigation.navigate("EditPills");
              }}
            >
              <MaterialIcons name="edit" size={18} color={Color.tagLine} />
            </Pressable>
          </View>

          <View style={styles.timeContainer}>
            <TimePicker />
          </View>
        </View>

        <View style={styles.buttonView}>
          <MainButton onPress={handleRouting} style={styles.button}>
            Next
          </MainButton>
        </View>
      </View>
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

  text: {
    textTransform: "none",
    marginHorizontal: 18,
    marginBottom: 20,
    marginTop: 50,
    fontSize: 20,
    width: 320,
  },

  container: {
    flex: 1,
    backgroundColor: Color.container,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "space-between",
    paddingBottom: 20,
  },

  subContainer: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 30,
  },

  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textContainer: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    fontSize: 16,
  },

  timeContainer: {
    alignItems: "center",
    marginVertical: "auto",
    padding: 20,
  },

  buttonView: {
    alignItems: "center",
  },

  button: {
    width: "90%",
  },
});
