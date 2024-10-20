import { View, Text, StyleSheet } from "react-native";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function FallHistory({ itemData }) {
  const { date, time, falldetails } = itemData;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Date & Time:{" "}
        <Text style={styles.subText}>
          {date} - {time}
        </Text>
      </Text>
      <Text style={styles.text}>
        Fall Details: <Text style={styles.subText}>{falldetails}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.container,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 14,
  },

  text: {
    fontFamily: Fonts.sub,
    color: Color.tagLine,
    fontWeight: "bold",
  },

  subText: {
    color: "#fff",
  },
});
