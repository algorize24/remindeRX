import { View, Text, StyleSheet, FlatList } from "react-native";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

import ListInventory from "../../components/desc/ListInventory";
import TextScreen from "../../components/header/TextScreen";

import Label from "../../components/dashboard/Label";

export default function InventoryScreen({ navigation }) {
  const inventoryData = [
    {
      id: 1,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2024",
      stock: "5",
    },
    {
      id: 2,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2025",
      stock: "5",
    },
    {
      id: 3,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2026",
      stock: "5",
    },
    {
      id: 4,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2027",
      stock: "5",
    },
    {
      id: 5,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2028",
      stock: "5",
    },
    {
      id: 6,
      img: require("../../assets/others/medicine.webp"),
      medicine: "Acetaminophen",
      dosage: "500",
      expDate: "01/01/2029",
      stock: "5",
    },
  ];
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Medicine Inventory</TextScreen>
      </View>

      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            navigation.navigate("AddMedicine");
          }}
        >
          Lists of Medicine
        </Label>

        {inventoryData < 1 ? (
          <View style={styles.isEmpty}>
            <Text style={styles.isEmptyText}>
              Your Inventory is Currently Empty
            </Text>
          </View>
        ) : (
          <FlatList
            overScrollMode="never"
            bounces={false}
            data={inventoryData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListInventory itemData={item} />}
            numColumns={1}
            key={1}
          />
        )}
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

  textContainer: {
    marginTop: 20,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },

  isEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  isEmptyText: {
    textAlign: "center",
    color: Color.tagLine,
    fontFamily: Fonts.sub,
    fontSize: 13,
  },
});
