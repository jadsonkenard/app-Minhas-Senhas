import { Modal, View, Text, StyleSheet, TextInput } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import { Button } from "../button";

type ModalInfoProps = {
  isVisible: boolean;
  onClose: () => void;
  removePass: () => void;
  nameApp: string[];
  loginApp: string[];
  passwordApp: string[];
};

export function ModalInfo({
  isVisible,
  onClose,
  removePass,
  nameApp,
  loginApp,
  passwordApp,
}: ModalInfoProps) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.nameApp}>{nameApp}</Text>
          <View style={styles.viewLoginApp}>
            <TextInput style={styles.input} value={loginApp[0]} />
          </View>
          <View style={styles.viewPassApp}>
            <TextInput style={styles.input} value={passwordApp[0]} />
          </View>
          <View style={styles.buttons}>
            <Button title="Voltar" onPress={onClose} />
            <Button title="Apagar" onPress={removePass} />
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
    height: RFPercentage(35),
    width: RFPercentage(45),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  nameApp: {
    fontFamily: theme.fonts.bold,
    fontSize: 22,
    color: theme.colors.gray,
  },
  viewLoginApp: {
    height: RFPercentage(6),
  },
  viewPassApp: {
    height: RFPercentage(6),
    marginTop: 10,
  },
  input: {
    fontFamily: theme.fonts.bold,
    fontSize: 18,
    backgroundColor: theme.colors.gray,
    height: "100%",
    width: RFPercentage(37),
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  passwordApp: {
    fontFamily: theme.fonts.regular,
    fontSize: 22,
  },
  buttons: {
    marginTop: 14,
    flexDirection: "row",
  },
});
