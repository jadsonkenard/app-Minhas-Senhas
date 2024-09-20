import {
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";

type CardProps = PressableProps & {
  nameApp: string;
  loginApp?: string;
};

export function Card({ nameApp, loginApp, ...props }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.nameApp}>{nameApp}</Text>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.3 : 1 },
          styles.content,
        ]}
        {...props}
      >
        <Text style={styles.nameApp}>{loginApp}</Text>
        <Text style={styles.passwordApp}>••••••••••••••</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    marginTop: 8
  },
  content: {
    backgroundColor: theme.colors.gray80,
    height: RFPercentage(12),
    width: RFPercentage(48),
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
