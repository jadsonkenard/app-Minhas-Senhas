import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Loading } from "./src/components";
import { Home } from "./src/screens";
import { useEffect, useState } from "react";
import { theme } from "./src/theme";

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
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      {splash ? <Home /> : <Loading />}
    </SafeAreaView>
  );
}
