import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import user from "../../assets/user.png";
import { Button, Card } from "../../components";
import { Modal } from "../../components";
import { ModalInfo } from "../../components";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Data = {
  id: string;
  nameApp: string;
  passwordApp: string;
};

const KEY_STORAGE = "@appmypass";

export function Home() {
  const [data, setData] = useState<Data[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfoVisible, setModalInfoVisible] = useState(false);
  const [info, setInfo] = useState<Data[]>([]);

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
  }, [data]);

  async function handleRemove(id: string) {
    const response = await AsyncStorage.getItem(KEY_STORAGE);
    const previousData = response ? JSON.parse(response) : [];

    const newData = previousData.filter((item: Data) => item.id !== id);
    await AsyncStorage.setItem(KEY_STORAGE, JSON.stringify(newData));
    getData();
    setModalInfoVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoUser}>
          <Image source={user} style={styles.avatar} />
          <Text style={styles.userName}>Joao</Text>
        </View>
        <View style={styles.addPassword}>
          <Text style={styles.yourPass}>Suas senhas</Text>
          <Button title="Nova" onPress={() => setModalVisible(true)} />
        </View>
      </View>
      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)} />
      <ModalInfo
        isVisible={modalInfoVisible}
        onClose={() => setModalInfoVisible(false)}
        removePass={() => handleRemove(info[0].id)}
        nameApp={info.map((item) => item.nameApp)}
        passwordApp={info.map((item) => item.passwordApp)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {data.map((item) => (
          <Card
            key={item.id}
            nameApp={item.nameApp}
            onPress={() => showInfo(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
