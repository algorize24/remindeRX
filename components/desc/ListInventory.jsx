import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

import { useNavigation } from "@react-navigation/native";

export default function ListInventory({ itemData }) {
  const { id, img, medicine, dosage, expDate, stock } = itemData;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EditInventory", {
          id: id,
          medicine: medicine,
          dosage: dosage,
          expDate: expDate,
          stock: stock,
        });
      }}
      style={({ pressed }) => [styles.medView, pressed && styles.pressed]}
    >
      <View style={styles.container}>
        <View>
          <Image style={styles.img} source={img} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.medText}>
            {medicine}, {dosage}mg
          </Text>

          <View style={styles.status}>
            <View>
              <Text style={styles.statusText}>Expiration Date</Text>
              <Text style={styles.mainText}>{expDate}</Text>
            </View>
            <View>
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
    borderRadius: 10,
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
  },

  status: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  statusText: {
    fontFamily: Fonts.mainLight,
    color: Color.tagLine,
    fontSize: 10,
  },

  mainText: {
    color: "#fff",
    fontFamily: Fonts.main,
  },
});
