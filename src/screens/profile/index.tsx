import { View, Text, StyleSheet, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Button, Input, Menu, ModalGlobal } from "../../components";
import { useEffect, useState } from "react";
import { theme } from "../../theme";
import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VALID_EMAIL_EXPRESSION =
  /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

const KEY_USERNAME_STORAGE = "@nameuser";

type User = {
  name: string;
  lastName: string;
  email: string;
};

export function Profile() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dataUserName, setDataUsername] = useState<User[]>([]);
  const [visible, setVisible] = useState(false);

  const [erroName, setErroName] = useState("");
  const [erroLastName, setErroLastName] = useState("");
  const [erroEmail, setErroEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function formValidator() {
    if (name == "" || name.length < 3) {
      setErroName("Nome inválido");
      return;
    }
    if (lastName == "" || lastName.length < 3) {
      setErroLastName("Sobrenome inválido");
      return;
    }
    if (!VALID_EMAIL_EXPRESSION.test(email.toLocaleLowerCase())) {
      setErroEmail("Email inválido");
      return;
    }
    setNameUser();
  }

  async function setNameUser() {
    setIsLoading(true);
    try {
      const id = uuid();
      const newUser = {
        id,
        name,
        lastName,
        email,
      };
      await AsyncStorage.setItem(KEY_USERNAME_STORAGE, JSON.stringify(newUser));
      Alert.alert("Atenção", "Dados alterados com sucesso!");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
    setVisible(false);
  }

  async function getUserName() {
    const response = await AsyncStorage.getItem(KEY_USERNAME_STORAGE);
    const dataUser = response ? JSON.parse(response) : {};

    setDataUsername([dataUser]);
  }

  useEffect(() => {
    getUserName();
  });

  const nameString = dataUserName.map((item) => item.name).toString();
  const lastNameString = dataUserName.map((item) => item.lastName).toString();
  const emailString = dataUserName.map((item) => item.email).toString();

  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Text>Foto</Text>
      </View>
      <View style={styles.viewMenu}>
        <Menu icon="user" title={nameString} />
        <Menu icon="user-check" title={lastNameString} />
        <Menu icon="at-sign" title={emailString} />
      </View>
      <ModalGlobal isVisible={visible} onCLose={() => setVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.titleModal}>Altere seus dados</Text>
          <Input
            icon="user"
            onChangeText={setName}
            onChange={() => setErroName("")}
            placeholder="Nome"
          />
          {erroName ? (
            <Text style={styles.erroMessage}>{erroName}</Text>
          ) : (
            <Text style={styles.noError}> </Text>
          )}
          <Input
            icon="user-check"
            onChange={() => setErroLastName("")}
            onChangeText={setLastName}
            placeholder="Sobrenome"
          />
          {erroLastName ? (
            <Text style={styles.erroMessage}>{erroLastName}</Text>
          ) : (
            <Text style={styles.noError}> </Text>
          )}
          <Input
            icon="at-sign"
            onChange={() => setErroEmail("")}
            onChangeText={setEmail}
            placeholder="Email"
          />
          {erroEmail ? (
            <Text style={styles.erroMessage}>{erroEmail}</Text>
          ) : (
            <Text style={styles.noError}> </Text>
          )}
          <View style={styles.buttonsModal}>
            <Button onPress={formValidator} isLoading={isLoading}>
              <Text>Salvar</Text>
            </Button>
            <Button onPress={() => setVisible(false)}>
              <Text>Fechar</Text>
            </Button>
          </View>
        </View>
      </ModalGlobal>
      <View style={styles.button}>
        <Button onPress={() => setVisible(true)}>
          <Text>Alterar</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  viewImage: {
    alignItems: "center",
    justifyContent: "center",
    height: RFPercentage(15),
  },
  viewMenu: {
    alignItems: "center",
    marginTop: 8,
  },
  titleModal: {
    fontFamily: theme.fonts.bold,
    fontSize: 22,
    color: theme.colors.gray,
    alignSelf: "center",
    marginTop: RFPercentage(2),
  },
  modalContent: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  buttonsModal: {
    flexDirection: "row",
    marginTop: RFPercentage(1),
  },
  button: {
    marginTop: RFPercentage(2),
  },
  erroMessage: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.red,
  },
  noError: {
    fontFamily: theme.fonts.regular,
    fontSize: 14,
  },
});
