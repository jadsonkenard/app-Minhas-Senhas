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
      <TextInput style={styles.container} {...props} placeholderTextColor={theme.colors.gray}/>

      <Feather style={styles.icon} name={icon} size={20} color={theme.colors.gray} />

    </View>
  );
}

const styles = StyleSheet.create({
view: {
    flexDirection: "row",
    height: RFPercentage(6),
    width: "100%",
    marginVertical: RFPercentage(1),
    alignItems: "center",
    justifyContent: "center",
},
  container: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: 10,
    height: "100%",
    width: "80%",
    paddingLeft: RFPercentage(5),
    paddingRight: RFPercentage(2),
    fontSize: 18,
    color: theme.colors.gray,
  },
  icon: {
    position: "absolute",
    left: RFPercentage(5)
  }
});
