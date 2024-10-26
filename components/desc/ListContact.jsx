import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function ListContact({ itemData, onPress }) {
  const { id, img, name, number } = itemData;

  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("EditContact", {
          contactId: id,
          name: name,
          number: number,
        });
      }}
      style={({ pressed }) => [styles.root, pressed && styles.press]}
    >
      <View style={styles.container}>
        <Image style={styles.img} source={img} />

        <View style={styles.user}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.number}>
            +63 <Text style={styles.numberData}>{number} </Text>
          </Text>
        </View>
      </View>

      <View style={styles.action}>
        <Text
          onPress={() => {
            console.log("Call");
          }}
          style={styles.actionCall}
        >
          Call
        </Text>
        <Text
          onPress={() => {
            console.log("Text");
          }}
          style={styles.actionName}
        >
          Text
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    marginVertical: 10,
  },

  press: {
    opacity: 0.7,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },

  name: {
    fontFamily: Fonts.main,
    color: "#fff",
    textTransform: "capitalize",
  },

  number: {
    fontFamily: Fonts.main,
    color: Color.tagLine,
  },

  numberData: {
    color: "#fff",
  },

  user: {
    marginLeft: 10,
  },

  action: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },

  actionName: {
    marginHorizontal: 3,
    fontFamily: Fonts.main,
    color: "#fff",
  },

  actionCall: {
    marginHorizontal: 3,
    fontFamily: Fonts.main,
    color: Color.greenColor,
  },
});
