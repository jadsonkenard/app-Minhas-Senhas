import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";

type CardProps = {
  nameApp: string;
  passwordApp: string;
};

export function Card({ nameApp, passwordApp }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameApp}>{nameApp}</Text>
      <Text style={styles.passwordApp}>{passwordApp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray80,
    height: RFPercentage(10),
    width: RFPercentage(45),
    marginTop: 8,
    justifyContent: "center"
  },
  nameApp: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    marginLeft: RFPercentage(2)
  },
  passwordApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 18,
    marginLeft: RFPercentage(2)
  },
});
