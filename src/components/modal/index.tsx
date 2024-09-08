import { useState } from "react";
import { Modal as ModalApp, StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "../button";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function Modal({ isVisible, onClose }: ModalProps) {
  return (
    <ModalApp visible={isVisible} transparent>
      <View style={styles.container}>
        <View style={styles.content}>
          <Button title="fechar" onPress={onClose}/>
        </View>
      </View>
    </ModalApp>
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
    height: RFPercentage(45),
    width: RFPercentage(40),
    borderRadius: 25
  },
});
