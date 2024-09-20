import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import user from "../../assets/user.png";
import { Button, Card } from "../../components";
import { Modal } from "../../components";
import { ModalInfo } from "../../components";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import { StackScreensProps } from "../../routes/routes";

type Data = {
  id: string;
  nameApp: string;
  loginApp: string;
  passwordApp: string;
};
type User = {
  name: string;
}

const KEY_STORAGE = "@appmypass";
const KEY_USERNAME_STORAGE = "@nameuser"

export function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [dataUserName, setDataUsername] = useState<User []>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [info, setInfo] = useState<Data[]>([]);

  const{ navigate } = useNavigation<StackScreensProps>();

  async function getUserName(){
    const response = await AsyncStorage.getItem(KEY_USERNAME_STORAGE);
    const dataUserName = response ? JSON.parse(response) : {}

    setDataUsername([dataUserName])
  }

  async function getData() {
    const response = await AsyncStorage.getItem(KEY_STORAGE);
    const data = response ? JSON.parse(response) : [];

    setData(data);
  }

  async function showInfo(id: string) {
    const info = data.filter((item) => item.id == id);

    setInfo(info);
    setModalInfoVisible(true);
  }

  useEffect(() => {
    getData();
    getUserName();
  }, [data]);

  function confirmRemove(id: string) {
    Alert.alert("Deletar senha", "Deseja realmente deletar esta senha?", [
      { text: "Cancelar", onPress: () => {} },
      { text: "Sim", onPress: () => handleRemove(id) },
    ]);
  }

  async function handleRemove(id: string) {
    const response = await AsyncStorage.getItem(KEY_STORAGE);
    const previousData = response ? JSON.parse(response) : [];

    const newData = previousData.filter((item: Data) => item.id !== id);
    await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(newData));
    getData();
    setModalInfoVisible(false);
  }

  function handleCopy(id: string) {
    const info = data
      .filter((item) => item.id == id)
      .map((item) => item.passwordApp);
    Clipboard.setStringAsync(info.toString());
    Alert.alert("Sucesso!", "Senha copiada para a área de transferência!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoUser}>
          <TouchableOpacity onPress={() => navigate("Profile") }>
            <Image source={user} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.userName}>{dataUserName.map((item) => item.name)}</Text>
        </View>
        <View style={styles.addPassword}>
          <Text style={styles.yourPass}>Suas senhas: {data.length}</Text>
          <Button title="Nova" onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <ModalInfo
        isVisible={modalInfoVisible}
        onClose={() => setModalInfoVisible(false)}
        removePass={() => confirmRemove(info[0].id)}
        nameApp={info.map((item) => item.nameApp)}
        loginApp={info.map((item) => item.loginApp)}
        passwordApp={info.map((item) => item.passwordApp)}
      />
      {data.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <Card
              key={item.id}
              nameApp={item.nameApp}
              loginApp={item.loginApp}
              onPress={() => showInfo(item.id)}
              onLongPress={() => handleCopy(item.id)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma senha salva.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: theme.fonts.regular,
    color: theme.colors.primary,
    fontSize: 18,
  },
  header: {
    height: RFPercentage(18),
    width: "100%",
    backgroundColor: theme.colors.primary,
  },
  infoUser: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFPercentage(5),
    marginLeft: RFPercentage(2),
  },
  avatar: {
    height: RFPercentage(5),
    width: RFPercentage(5),
    borderRadius: 50,
  },
  userName: {
    fontFamily: theme.fonts.regular,
    fontSize: 18,
    color: theme.colors.primaryWhite,
    marginLeft: RFPercentage(2),
  },
  addPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFPercentage(2),
    marginHorizontal: RFPercentage(2),
  },
  yourPass: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.primaryWhite,
    fontSize: 22,
  },
});
