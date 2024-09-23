import { View, Text, StyleSheet, Alert } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Button, Input, Menu, ModalGlobal } from "../../components";
import { useEffect, useState } from "react";
import { theme } from "../../theme";
import { v4 as uuid } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_USERNAME_STORAGE = "@nameuser";

type User = {
  name: string;
};

export function Profile() {
  const [name, setName] = useState("");
  const [dataUserName, setDataUsername] = useState<User[]>([]);
  const [visible, setVisible] = useState(false);

  async function setNameUser() {
    try {
      const id = uuid();
      const newName = {
        id,
        name,
      };
      await AsyncStorage.setItem(KEY_USERNAME_STORAGE, JSON.stringify(newName));
      Alert.alert("dados salvos");
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserName() {
    const response = await AsyncStorage.getItem(KEY_USERNAME_STORAGE);
    const dataUserName = response ? JSON.parse(response) : {};

    setDataUsername([dataUserName]);
  }

  useEffect(() => {
    getUserName();
  });

  const userNameString = dataUserName.map((item) => item.name).toString();

  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Text>Foto</Text>
      </View>
      <View style={styles.viewMenu}>
        <Menu icon="edit-3" title={userNameString} onPress={() => setVisible(true)} />
        <Menu />
        <Menu />
        <Menu />
      </View>
      <ModalGlobal isVisible={visible} onCLose={() => setVisible(false)}>
        <Text style={styles.titleModal}>Nome</Text>
        <Input icon="edit-3" onChangeText={setName} />
        <Button title="Salvar" onPress={setNameUser}/>
      </ModalGlobal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
