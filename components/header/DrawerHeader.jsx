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
  Pressable,
} from "react-native";
import HeaderTitle from "./HeaderTitle";
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function DrawerHeader(props) {
  const handleLogOut = () => {
    props.navigation.navigate("/testing");
  };
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

      <View style={styles.press}>
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.pressed,
          ]}
          onPress={handleLogOut}
        >
          <Text style={styles.logoutText}>Sign out</Text>
        </Pressable>
      </View>
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
    alignItems: "",
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
    fontWeight: "bold",
    marginBottom: 2,
  },
  userAddress: {
    fontFamily: Fonts.sub,
    fontSize: 12,
    color: Color.tagLine,
  },

  press: {
    paddingHorizontal: 17,
    paddingBottom: 40,
  },

  pressed: {
    opacity: 0.7,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.main,
    fontWeight: "bold",
  },
});
