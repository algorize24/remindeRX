import {
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";

// components
import MainButton from "../../components/buttons/MainButton";
import FeatureText from "../../components/header/FeatureText";
import TextPolicy from "../../components/header/TextPolicy";

// constants
import { Fonts } from "../../constants/Font";
import { Color } from "../../constants/Color";

export default function RealTimeScreen({ navigation }) {
  // track image loading
  const [imageLoading, setImageLoading] = useState(true);

  // invoke in mainbutton
  const handleNext = () => {
    navigation.navigate("FallDetection");
  };
  return (
    <SafeAreaView style={styles.root}>
      <FeatureText style={styles.featureText} />
      <View>
        {imageLoading && <ActivityIndicator color={Color.purpleColor} />}

        <Image
          style={styles.img}
          source={require("../../assets/feature/realtime.png")}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        <TextPolicy style={styles.textPolicy}>
          Track Real-Time Health Stats
        </TextPolicy>

        <Text style={styles.mainText}>
          Monitor your <Text style={styles.rxText}>vital signs</Text> and{" "}
          <Text style={styles.rxText}>blood pressure</Text> in real-time,
          ensuring up-to-the-minue insights into your health. Stay informed with
          live updates for better health management.
        </Text>

        <MainButton onPress={handleNext} style={styles.mainButton}>
          Next
        </MainButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  featureText: {
    marginBottom: 10,
  },

  img: {
    width: "screen",
    height: 220,
  },

  textPolicy: {
    fontSize: 28,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  mainText: {
    paddingHorizontal: 10,
    fontFamily: Fonts.sub,
    fontSize: 16,
    color: Color.tagLine,
  },
  rxText: {
    color: Color.purpleColor,
    fontWeight: "bold",
  },

  mainButton: {
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    marginTop: 88,
  },
});
