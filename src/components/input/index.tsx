import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TextInputProps,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";

type InputProps = TextInputProps & {
  icon: keyof typeof Feather.glyphMap;
};

export function Input({ icon, ...props }: InputProps) {
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.container}
        {...props}
        placeholderTextColor={theme.colors.gray}
      />
      <Feather
        style={styles.icon}
        name={icon}
        size={20}
        color={theme.colors.gray}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    height: RFPercentage(7),
    width: "85%",
    marginTop: RFPercentage(0.5),
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    fontFamily: theme.fonts.bold,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    borderRadius: 8,
    height: "100%",
    width: "100%",
    paddingLeft: 35,
    paddingRight: RFPercentage(2),
    fontSize: 18,
    color: theme.colors.gray,
  },
  icon: {
    position: "absolute",
    left: 8,
  },
});
