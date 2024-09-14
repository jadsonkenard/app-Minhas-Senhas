import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/Feather";
import { Button } from "../button";

type ModalInfoProps = {
  isVisible: boolean;
  copyPass: () => void;
  removePass: () => void;
  nameApp: string[];
  passwordApp: string[];
};

export function ModalInfo({
  isVisible,
  copyPass,
  removePass,
  nameApp,
  passwordApp,
}: ModalInfoProps) {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.nameApp}>{nameApp}</Text>
          <View style={styles.viewPass}>
            <Text style={styles.passwordApp}>{passwordApp}</Text>
          </View>
          <View style={styles.buttons}>
            <Button title="Copiar" onPress={copyPass} />
            <Button title="Apagar" onPress={removePass}/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: theme.colors.primary,
    height: RFPercentage(22),
    width: RFPercentage(45),
    borderRadius: 25,
    alignItems: "center",
    elevation: 10,
  },
  nameApp: {
    fontFamily: theme.fonts.bold,
    fontSize: 22,
    color: theme.colors.gray,
  },
  viewPass: {
    backgroundColor: theme.colors.gray,
    height: RFPercentage(4),
    width: RFPercentage(30),
    marginVertical: RFPercentage(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  passwordApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 22,
  },
  buttons: {
    flexDirection: "row",
  },
});
