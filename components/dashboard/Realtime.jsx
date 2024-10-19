import { View, Text, StyleSheet } from "react-native";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

// icon
import Fontisto from "@expo/vector-icons/Fontisto";

export default function Realtime({ name, size, title, num, label }) {
  return (
    <View style={styles.realtime}>
      <View style={styles.realtimeContainer}>
        <Fontisto name={name} size={size} color="white" />

        <View style={styles.data}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.hr}>
            <Text style={styles.num}>{num}</Text>
            <Text style={styles.label}>{label}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  realtime: {
    marginTop: 21,
    backgroundColor: Color.container,
    borderRadius: 14,
    minHeight: 92,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 3,
  },

  realtimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  data: {
    marginLeft: 10,
  },

  title: {
    fontFamily: Fonts.main,
    fontWeight: "bold",
    color: Color.tagLine,
    textTransform: "uppercase",
    fontSize: 11,
  },

  hr: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  num: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 24,
    fontWeight: "bold",
  },

  label: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
