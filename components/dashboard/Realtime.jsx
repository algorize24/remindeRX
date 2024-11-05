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
        <View style={styles.data}>
          <Fontisto name={name} size={size} color="white" />
        </View>

        <View>
          <Text style={styles.title}>{title}</Text>

          {title === "Heart Rate" ? (
            <View style={styles.hr}>
              <Text style={styles.num}>{num}</Text>
              <Text style={styles.label}>{label}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.num}>{num}</Text>
              <Text style={styles.label}>{label}</Text>
            </View>
          )}
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
    paddingVertical: 18,
  },

  realtimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  data: {
    marginRight: 12,
  },

  title: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
    textTransform: "capitalize",
    fontSize: 12,
  },

  hr: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  num: {
    color: "white",
    fontFamily: Fonts.main,
    fontSize: 24,
  },

  label: {
    fontFamily: Fonts.sub,
    fontSize: 12,
    color: "#fff",
    marginLeft: 5,
  },
});
