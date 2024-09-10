import { useState } from "react";
import { Alert, Modal as ModalApp, StyleSheet, TouchableOpacity, View } from "react-native";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "../button";
import { Input } from "../input";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_STORAGE = "@appmypass"

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function Modal({ isVisible, onClose}: ModalProps) {
  const [nameApp, setNameApp] = useState("");
  const [passwordApp, setPasswordApp] = useState("");

  async function saveData(){
    try {
      const data = {
        nameApp,
        passwordApp
      }
      await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(data))
      Alert.alert("Dados", "Senha salva com sucesso!")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <ModalApp visible={isVisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x-square" size={32} color={theme.colors.green80} />
          </TouchableOpacity>
          <Input icon="heart" placeholder="Nome do App" onChangeText={setNameApp}/>
          <Input icon="lock" placeholder="Senha" onChangeText={setPasswordApp}/>
          <View style={styles.buttonSave}>
          <Button title="Salvar" onPress={saveData}/>
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
    elevation: 10
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
