// react-native
import { StatusBar } from "expo-status-bar";

// react
import { useState, useEffect } from "react";

// react-navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// custom-fonts
import * as Font from "expo-font";

// splash screen
import * as SplashScreen from "expo-splash-screen";

// constants
import { Color } from "./constants/Color";

// screen
import PolicyScreen from "./screens/PolicyScreen";
import TermOfUse from "./screens/TermOfUse";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";

const Stack = createNativeStackNavigator(); // stack navigator
SplashScreen.preventAutoHideAsync(); // Keep the splash screen visible while we fetch resources

// this fn component will only rendered once if the user install the application. privacy policy
function ReminderxPolicyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen name=" " component={PolicyScreen} />
      <Stack.Screen
        name="TermOfUse"
        component={TermOfUse}
        options={{
          headerTintColor: "white",
          title: "Terms of Use",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerTintColor: "white",
          title: "Privacy Policy",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

// this fn component will rendered if session expires or newly user. signIn/signUp
function ReminderAuthStack() {}

// this fn component will only rendered once if the user install the application. features section
function ReminderFeaturesStack() {}

// this fn component will show if the user is authenticated. main screen/component
function ReminderAuthenticated() {}

// main function
export default function App() {
  // state for font
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any other resources
        await Font.loadAsync({
          "work-sans": require("./assets/fonts/WorkSans-VariableFont_wght.ttf"),
          "merri-weather": require("./assets/fonts/Merriweather-Regular.ttf"),
        });
      } catch (err) {
        console.warn(err);
      } finally {
        // Once everything is ready, set the state and hide the splash screen
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null; // Do not render anything while the app is loading
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <ReminderxPolicyStack />
      </NavigationContainer>
    </>
  );
}
