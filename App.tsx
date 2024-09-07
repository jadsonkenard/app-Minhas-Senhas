import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Loading } from "./src/components";
import { theme } from "./src/theme";
import { Home } from "./src/screens";
import { useEffect, useState } from "react";

export default function App() {
  const[splash, setSplash] = useState(false)
  const [fontLoad] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  function splashScreen(){
    setSplash(true)
  }
  useEffect(() => {
    setTimeout(splashScreen, 3000)
  },[])

  if (!fontLoad) {
    return <Loading/>
  }
  return (
    <>
    {splash ? <Home/> : <Loading/>}
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: 25,
  },
});
