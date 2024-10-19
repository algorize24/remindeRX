import { StatusBar } from "expo-status-bar"; // react-native
import { useState, useEffect } from "react"; // react

// react-navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font"; // custom-fonts
import * as SplashScreen from "expo-splash-screen"; // splash screen

// icons
import {
  Fontisto,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

// constants
import { Color } from "./constants/Color";

// screens - ReminderxPolicyStack
import PolicyScreen from "./screens/reminderxpolicy/PolicyScreen";
import TermOfUse from "./screens/reminderxpolicy/TermOfUse";
import PrivacyPolicyScreen from "./screens/reminderxpolicy/PrivacyPolicyScreen";

// screens - ReminderAuthStack
import AuthSelect from "./screens/reminderxauth/AuthSelect";
import AuthLogin from "./screens/reminderxauth/AuthLogin";
import AuthSignUp from "./screens/reminderxauth/AuthSignUp";
import ForgotPassword from "./screens/reminderxauth/ForgotPassword";
import ResetPassword from "./screens/reminderxauth/ResetPassword";
import SetPassword from "./screens/reminderxauth/SetPassword";
import CreatingAccount from "./screens/reminderxauth/CreatingAccount";

// screens - ReminderFeaturesStack
import RealTimeScreen from "./screens/reminderfeatures/RealTimeScreen";
import ReminderFallDetectScreen from "./screens/reminderfeatures/ReminderFallDetectScreen";
import ReminderMedScreen from "./screens/reminderfeatures/ReminderMedScreen";

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
function ReminderAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="ReminderxPolicyStack"
        component={ReminderxPolicyStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthSelect"
        component={AuthSelect}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Signin"
        component={AuthLogin}
        options={{
          headerTintColor: "white",
          title: " ",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={AuthSignUp}
        options={{
          headerTintColor: "white",
          title: " ",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerTintColor: "white",
          title: "",
        }}
      />

      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerTintColor: "white",
          title: "",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          headerTintColor: "white",
          title: "",
        }}
      />

      <Stack.Screen
        name="CreatingAccount"
        component={CreatingAccount}
        options={{
          headerTintColor: "white",
          title: "",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

// this fn component will only rendered once if the user install the application. features section
function ReminderFeaturesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.bgColor },
        contentStyle: { backgroundColor: Color.bgColor },
      }}
    >
      <Stack.Screen
        name="ReminderAuthStack"
        component={ReminderAuthStack}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RealTime"
        component={RealTimeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FallDetection"
        component={ReminderFallDetectScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MedicineReminder"
        component={ReminderMedScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

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
          ...Fontisto.font,
          ...Feather.font,
          ...Entypo.font,
          ...MaterialCommunityIcons.font,
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
        {/* <ReminderxPolicyStack /> */}
        {/* <ReminderAuthStack /> */}
        <ReminderFeaturesStack />
      </NavigationContainer>
    </>
  );
}
