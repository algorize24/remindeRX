import { StyleSheet, FlatList, View } from "react-native";

// constants
import { Color } from "../../constants/Color";

// components
import Userprofile from "../../components/dashboard/Userprofile";
import HealthOverview from "../../components/dashboard/HealthOverview";
import NewsArticle from "../../components/dashboard/NewsArticle";

export default function DashboardScreen() {
  // avoid virtualizedLists error
  const sections = [
    { key: "UserProfile", component: <Userprofile /> },
    { key: "HealthOverview", component: <HealthOverview /> },
    { key: "NewsArticle", component: <NewsArticle /> },
  ];
  return (
    <FlatList
      overScrollMode="never"
      bounces={false}
      style={styles.root}
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <View>{item.component}</View>}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Color.bgColor,
    paddingHorizontal: 18,
  },
});
