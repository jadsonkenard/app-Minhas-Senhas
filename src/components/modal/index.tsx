import { useState } from "react";
import { Modal as ModalApp, StyleSheet, View, Text } from "react-native";
import { theme } from "../../theme";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button } from "../button";
import { Input } from "../input";
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
  const [onSucess, setOnSucess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let noError = <Text style={styles.noError}> </Text>;
  let sucess = <Text style={styles.sucess}> </Text>;

  function formValidator() {
    if (nameApp == "") {
      setErrorName("O nome do App é obrigatório");
      return;
    }
    if (passwordApp == "") {
      setErrorPass("O senha do App é obrigatório");
      return;
    }
    saveData();
  }

  async function saveData() {
    setIsLoading(true)
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
      setNameApp("");
      setPasswordApp("");
      setIsLoading(false);
      setOnSucess("Senha salva com sucesso.");
      setTimeout(() => {setOnSucess("")}, 3000)
    } catch (error) {
      console.log(error);
    }
  }

  function getPassword() {
    let chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ@*";
    let passwordLength = 10;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setPasswordApp(password);
    setErrorPass("");
  }

  return (
    <ModalApp visible={isVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.closeButton}>
          <Button title="Fechar" onPress={onClose} />
        </View>
        <View style={styles.content}>
          <Input
            icon="heart"
            value={nameApp}
            placeholder="Nome do App"
            onChange={() => setErrorName("")}
            onChangeText={setNameApp}
          />
          <Text style={styles.errorMessage}>
            {errorName ? errorName : noError}
          </Text>
          <Input
            icon="lock"
            value={passwordApp}
            placeholder="Senha"
            onChange={() => setErrorPass("")}
            onChangeText={setPasswordApp}
          />
          <Text style={styles.errorMessage}>
            {errorPass ? errorPass : noError}
          </Text>
          <Text style={styles.sucess}>
            {onSucess ? onSucess : sucess}
          </Text>
          <View style={styles.buttons}>
            <Button title="Salvar" onPress={formValidator} isLoading={isLoading}/>
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  closeButton: {
    marginBottom: RFPercentage(1),
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
    fontSize: 14,
  },
  sucess: {
    fontSize: 14,
    color: theme.colors.green80
  }
});
