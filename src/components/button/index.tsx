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
    height: RFPercentage(5),
    width: RFPercentage(11),
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: RFPercentage(1),
  },
  title: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primary,
    fontSize: 20,
  },
});
