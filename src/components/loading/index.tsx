import { ActivityIndicator, StyleSheet, Image, View } from "react-native";
import logo from "../../assets/logo.png";
import { theme } from "../../theme";

export function Loading() {
  return (
    <View style={styles.loading}>
      <Image source={logo} style={styles.logo} />
      <ActivityIndicator size={30} color={theme.colors.green80} />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
});
