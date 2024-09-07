import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.green80,
    height: RFPercentage(4),
    width: RFPercentage(10),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary, 
    fontSize: 20
  }
});
