import { Text, StyleSheet, Pressable, PressableProps } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";

type CardProps = PressableProps & {
  nameApp: string;
};

export function Card({ nameApp, ...props }: CardProps) {
  return (
    <Pressable style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.container]} {...props}>
      <Text style={styles.nameApp}>{nameApp}</Text>
      <Text style={styles.passwordApp}>••••••••••••••</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray80,
    height: RFPercentage(8),
    width: RFPercentage(48),
    marginTop: 8,
    justifyContent: "center",
    borderRadius: 8,
  },
  nameApp: {
    fontFamily: theme.fonts.bold,
    fontSize: 22,
    marginLeft: RFPercentage(2),
  },
  passwordApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 25,
    marginLeft: RFPercentage(2),
  },
});
