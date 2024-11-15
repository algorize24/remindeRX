import { View, Text, StyleSheet, Image, Pressable } from "react-native";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import { useNavigation } from "@react-navigation/native";

export default function ListInventory({ itemData }) {
  // this data is from the InventoryScreen.jsx
  const { _id, medicine_name, dosage, expiration_date, stock } = itemData;
  const navigation = useNavigation();

  // format expiration date YYYY/MM/DD
  const formattedDate = new Date(expiration_date).toISOString().split("T")[0];
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EditInventory", {
          medicineId: _id,
          medicine: medicine_name,
          dosage,
          expiration_date,
          stock,
        });
      }}
      style={({ pressed }) => [styles.medView, pressed && styles.pressed]}
    >
      <View style={styles.container}>
        <View>
          <Image
            style={styles.img}
            source={require("../../assets/others/medicine.webp")}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.medText}>
            {medicine_name}, <Text style={styles.dosageText}>{dosage}mg</Text>
          </Text>

          <View style={styles.status}>
            <View style={styles.statusSection}>
              <Text style={styles.statusText}>Expiration Date</Text>
              <Text style={styles.mainText}>{formattedDate}</Text>
            </View>
            <View style={styles.statusSection}>
              <Text style={styles.statusText}>Stock</Text>
              <Text style={styles.mainText}>{stock}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  medView: {
    flex: 1,
    backgroundColor: Color.container,
    borderRadius: 4,
    margin: 5,
    padding: 12,
  },

  pressed: {
    opacity: 0.7,
  },

  container: {
    flexDirection: "row",
  },

  img: {
    width: 120,
    height: 80,
    borderRadius: 3,
  },

  textContainer: {
    color: "#fff",
    marginLeft: 10,
  },

  medText: {
    fontFamily: Fonts.main,
    color: "#fff",
    textTransform: "capitalize",
  },

  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: "100%",
  },

  statusSection: {
    flex: 1,
  },

  statusText: {
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
    fontSize: 12,
  },

  mainText: {
    color: "#fff",
    fontFamily: Fonts.main,
  },

  dosageText: {
    color: "#fff",
    textTransform: "lowercase",
  },
});
