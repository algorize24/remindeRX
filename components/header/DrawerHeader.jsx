import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";

import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

import HeaderTitle from "./HeaderTitle";

export default function DrawerHeader(props) {
  return (
    <SafeAreaView style={styles.root}>
      <HeaderTitle style={styles.text} />
      <View style={styles.user}>
        <Image
          style={styles.userIcon}
          source={require("../../assets/user.png")}
        />
        <Text style={styles.userEmail}>siuzysaur@gmail.com</Text>
        <Text style={styles.userAddress}>
          Mandaluyong, Metro Manila Philippines
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: 10,
  },
  text: {
    paddingLeft: 12,
  },
  user: {
    marginTop: 12,
    padding: 16,
  },
  userIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "white",
    fontFamily: Fonts.main,
    marginBottom: 2,
  },
  userAddress: {
    fontFamily: Fonts.sub,
    fontSize: 12,
    color: Color.tagLine,
  },
});
