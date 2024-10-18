import { ScrollView, StyleSheet } from "react-native";

// components
import TitlePolicy from "../../components/header/TitlePolicy";
import WelcomePolicy from "../../components/header/WelcomePolicy";
import ListPrivacyPolicy from "../../components/desc/ListPrivacyPolicy";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      overScrollMode="never"
      style={styles.root}
    >
      <TitlePolicy
        text={"Privacy Policy"}
        date={"October 2024"}
        bounce={false}
      />

      <WelcomePolicy
        welcome={
          "At RemindeRx, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile app, website, and related services. By accessing or using the Service, you consent to the data practices described in this Privacy Policy. If you do not agree with this policy, please do not use the Service."
        }
      />

      <ListPrivacyPolicy />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginVertical: 50,
    paddingHorizontal: 14,
  },
});
