import { useEffect, useState } from "react";
import {
  Alert,
  Modal as ModalApp,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "../button";
import { Input } from "../input";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

const KEY_STORAGE = "@appmypass";

type ModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

export function Modal({ isVisible, onClose }: ModalProps) {
  const [nameApp, setNameApp] = useState("");
  const [passwordApp, setPasswordApp] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorPass, setErrorPass] = useState("");

  let noError = <Text style={styles.noError}> </Text>

  function formValidator(){
    if(nameApp == ""){
      setErrorName("O nome do App é obrigatório")
      return
    }
    if(passwordApp == ""){
      setErrorPass("O senha do App é obrigatório")
      return
    }
    saveData()
  }

  async function saveData() {

    try {
      const id = uuid();
      const newData = {
        id,
        nameApp,
        passwordApp,
      };

      const response = await AsyncStorage.getItem(KEY_STORAGE);
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(data));
      setNameApp("")
      setPasswordApp("")
    } catch (error) {
      console.log(error);
    }
  }

  function getPassword() {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
    let passwordLength = 16;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPasswordApp(password)
  }

  return (
    <ModalApp visible={isVisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x-square" size={32} color={theme.colors.green80} />
          </TouchableOpacity>
          <Input
            icon="heart"
            value={nameApp}
            placeholder="Nome do App"
            onChange={() => setErrorName("")}
            onChangeText={setNameApp}
          />
          <Text style={styles.errorMessage}>{errorName ? errorName : noError}</Text>
          <Input
            icon="lock"
            value={passwordApp}
            placeholder="Senha"
            onChange={() => setErrorPass("")}
            onChangeText={setPasswordApp}
          />
          <Text style={styles.errorMessage}>{errorPass ? errorPass : noError}</Text>
          <View style={styles.buttons}>
            <Button title="Salvar" onPress={formValidator} />
            <Button title="Gerar" onPress={getPassword} />
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
    height: RFPercentage(40),
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
  buttons: {
    flexDirection: "row",
    marginTop: 15,
  },
  errorMessage: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: "red",
  },
  noError: {
    fontSize: 14
  }
});
