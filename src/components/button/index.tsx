import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/Feather";

type ButtonProps = TouchableOpacityProps & {
  title?: string;
  isLoading?: boolean
};

export function Button({ title, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      {
        isLoading ? (
          <ActivityIndicator color={theme.colors.primary}/>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )
      }
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
