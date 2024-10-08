import { useState } from "react";
import {
  Modal as ModalApp,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
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
  const [loginApp, setLoginApp] = useState("");
  const [passwordApp, setPasswordApp] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [onSucess, setOnSucess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  let noError = <Text style={styles.noError}> </Text>;
  let sucess = (
    <Text style={styles.sucess}>
      Clique em gerar para obter uma senha forte
    </Text>
  );

  function formValidator() {
    if (nameApp == "") {
      setErrorName("O nome do App é obrigatório");
      return;
    }
    if (loginApp == "") {
      setErrorLogin("Login ou email do App é obrigatório");
      return;
    }
    if (passwordApp == "") {
      setErrorPass("O senha do App é obrigatório");
      return;
    }
    saveData();
  }

  async function saveData() {
    setIsLoading(true);
    try {
      const id = uuid();
      const newData = {
        id,
        nameApp,
        loginApp,
        passwordApp,
      };

      const response = await AsyncStorage.getItem(KEY_STORAGE);
      const previousData = response ? JSON.parse(response) : [];

      const data = [...previousData, newData];

      await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(data));
      setNameApp("");
      setLoginApp("");
      setPasswordApp("");
      setOnSucess("Senha salva com sucesso.");
      setTimeout(() => {
        setOnSucess("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
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
    <KeyboardAvoidingView behavior="padding">
      <ModalApp visible={isVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <View style={styles.content}>
              <Input
                icon="heart"
                value={nameApp}
                placeholder="Nome do app"
                onChange={() => setErrorName("")}
                onChangeText={setNameApp}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.errorMessage}>
                {errorName ? errorName : noError}
              </Text>
              <Input
                icon="at-sign"
                value={loginApp}
                placeholder="Nome de usuário ou email"
                onChange={() => setErrorLogin("")}
                onChangeText={setLoginApp}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
              <Text style={styles.errorMessage}>
                {errorLogin ? errorLogin : noError}
              </Text>
              <Input
                icon="lock"
                value={passwordApp}
                placeholder="Senha"
                onChange={() => setErrorPass("")}
                onChangeText={setPasswordApp}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.errorMessage}>
                {errorPass ? errorPass : noError}
              </Text>
              <Text style={styles.sucess}>{onSucess ? onSucess : sucess}</Text>
              <View style={styles.buttons}>
                <Button onPress={formValidator} isLoading={isLoading}>
                  <Text>Salvar</Text>
                </Button>
                <Button onPress={getPassword}>
                  <Text>Gerar</Text>
                </Button>
                <Button onPress={onClose}>
                  <Text>Fechar</Text>
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ModalApp>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(24,24,24,0.6)"
  },
  content: {
    backgroundColor: theme.colors.primary,
    height: RFPercentage(45),
    width: RFPercentage(45),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  buttons: {
    flexDirection: "row",
    marginTop: 15,
  },
  errorMessage: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.red,
  },
  noError: {
    fontSize: 14,
  },
  sucess: {
    fontSize: 14,
    color: theme.colors.green80,
  },
});
