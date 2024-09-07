import { ActivityIndicator, StyleSheet, Image, View } from "react-native";
import logo from "../../assets/logo.png";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

export function Loading() {
  return (
    <View style={styles.loading}>
      <Image source={logo} style={styles.logo} resizeMode="contain"/>
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
    marginVertical: RFPercentage(2),
    width: RFPercentage(10),
    height: RFPercentage(10),
  },
});
