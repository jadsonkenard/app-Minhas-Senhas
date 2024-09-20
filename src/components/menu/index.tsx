import { TouchableOpacity, TouchableOpacityProps, Text, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

type ButtonProps = TouchableOpacityProps & {
    icon?: keyof typeof Feather.glyphMap;
    title?: string;
}

export function Menu({ icon, title, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Feather name={icon} size={20} />
      <Text style={styles.title}>{title}</Text>
      <Feather name="chevron-right" size={25} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: RFPercentage(6),
    width: RFPercentage(45),
    borderRadius: 8,
    backgroundColor: theme.colors.gray80,
    paddingHorizontal: RFPercentage(1),
    justifyContent: "space-between",
    marginVertical: 2
  },
  title: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    position: "absolute",
    left: RFPercentage(6)
  },
});
