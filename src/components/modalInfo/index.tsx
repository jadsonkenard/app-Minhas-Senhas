import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import Feather from "@expo/vector-icons/Feather";
import { Button } from "../button";

type ModalInfoProps = {
  isVisible: boolean;
  copyPass: () => void;
  nameApp: any;
  passwordApp: any;
};

export function ModalInfo({
  isVisible,
  copyPass,
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
          <Button title="Copiar" onPress={copyPass}/>
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
    width: RFPercentage(40),
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  closeButton: {
    top: 16,
    right: 16,
    position: "absolute",
  },
  nameApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 22,
    color: theme.colors.green80,
  },
  viewPass: {
    backgroundColor: theme.colors.gray,
    height: RFPercentage(5),
    width: RFPercentage(30),
    marginVertical: RFPercentage(2),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25
  },
  passwordApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 22
  },
});
