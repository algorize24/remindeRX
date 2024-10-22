import { View, StyleSheet, TextInput, FlatList } from "react-native";
import { Color } from "../../constants/Color";

import TextScreen from "../../components/header/TextScreen";
import ListContact from "../../components/desc/ListContact";
import Label from "../../components/dashboard/Label";

export default function ContactScreen({ navigation }) {
  const contactData = [
    {
      id: 1,
      img: require("../../assets/user.png"),
      name: "Emergency Contact",
      number: "123-456-789",
    },
  ];
  return (
    <View style={styles.root}>
      <View style={styles.textContainer}>
        <TextScreen>Contact Information</TextScreen>
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Search Contact..."
        placeholderTextColor={Color.tagLine}
      />

      <View style={styles.dataContainer}>
        <Label
          onPress={() => {
            navigation.navigate("AddContact");
          }}
        >
          All Contact
        </Label>

        <FlatList
          overScrollMode="never"
          bounces={false}
          data={contactData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ListContact itemData={item} />}
        />
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

  textInput: {
    borderColor: Color.tagLine,
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Color.tagLine,
  },

  dataContainer: {
    marginTop: 54,
    flex: 1,
    marginBottom: 20,
  },
});
