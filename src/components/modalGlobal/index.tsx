import { PropsWithChildren } from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button } from "../button";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";

type ModalGlobalProps = {
  isVisible: boolean;
  onCLose: () => void;
};

export function ModalGlobal({
  isVisible,
  onCLose,
  children,
}: PropsWithChildren<ModalGlobalProps>) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.closeButton}>
            <Button title="Fechar" onPress={onCLose} />
          </View>
          <View style={styles.content}>
            <View>{children}</View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    height: RFPercentage(45),
    width: RFPercentage(45),
    borderRadius: 10,
    elevation: 10,
  },
  closeButton: {
    marginBottom: RFPercentage(1),
  },
});
