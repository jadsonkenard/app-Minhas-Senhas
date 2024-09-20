import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Loading } from "./src/components";
import { useEffect, useState } from "react";
import { theme } from "./src/theme";
import { Routes } from "./src/routes/routes";

export default function App() {
  const [splash, setSplash] = useState(false);
  const [fontLoad] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  function splashScreen() {
    setSplash(true);
  }
  useEffect(() => {
    setTimeout(splashScreen, 3000);
  }, []);

  if (!fontLoad) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor={theme.colors.primary}
          barStyle="light-content"
        />
        {splash ? <Routes /> : <Loading />}
      </SafeAreaView>
    </NavigationContainer>
  );
}
