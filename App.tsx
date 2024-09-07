import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Loading } from "./src/components";
import { theme } from "./src/theme";

export default function App() {
  const[fontLoad] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })
  if(!fontLoad){
    return <Loading/>
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
    color: theme.colors.green,
    fontSize: 25,
  }
});
