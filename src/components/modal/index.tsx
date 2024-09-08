import { useState } from "react";
import { Modal as ModalApp, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "../button";
import { Input } from "../input";
import Feather from "@expo/vector-icons/Feather";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function Modal({ isVisible, onClose }: ModalProps) {
  return (
    <ModalApp visible={isVisible} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x-square" size={32} color={theme.colors.green80} />
          </TouchableOpacity>
          <Input icon="heart" placeholder="Nome do App" />
          <Input icon="lock" placeholder="Senha" />
          <View style={styles.buttonSave}>
          <Button title="Salvar"/>
          </View>
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
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    top: 16,
    right: 16,
    position: "absolute"
  },
  buttonSave: {
    marginTop: 30
  }
});
