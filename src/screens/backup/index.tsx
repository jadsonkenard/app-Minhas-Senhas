import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "../../components";
import { useState } from "react";

const KEY_STORAGE = "@appmypass";

type Data = {
  id: string;
  nameApp: string;
  loginApp: string;
  passwordApp: string;
};

export function Backup() {
  const [backup, setBackup] = useState<Data[]>([])

  async function getPasswordsBackup(){
    const response = await AsyncStorage.getItem(KEY_STORAGE);
    const dataBackup = response ? JSON.parse(response) : [];

    setBackup(dataBackup)
    // console.log(setBackup)

  }

  return <View style={styles.container}>
    <Button onPress={getPasswordsBackup}><Text>Ver</Text></Button>
    <Text>{backup.map((item) => item.passwordApp)}</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
