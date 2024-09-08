import { View, Text, StyleSheet, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import user from "../../assets/user.png";
import { Button } from "../../components";
import { Modal } from "../../components";
import { useState } from "react";

export function Home() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoUser}>
          <Image source={user} style={styles.avatar}/>
          <Text style={styles.userName}>Joao</Text>
        </View>
        <View style={styles.addPassword}>
          <Text style={styles.yourPass}>Suas senhas</Text>
          <Button title="Nova" onPress={() => setModalVisible(true)}/>
        </View>
      </View>
      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: RFPercentage(18),
    width: "100%",
    backgroundColor: theme.colors.primary
  },
  infoUser:{
    alignItems: "center",
    flexDirection: "row",
    marginTop: RFPercentage(5),
    marginLeft: RFPercentage(2),
  },
  avatar: {
    height: RFPercentage(5),
    width: RFPercentage(5),
    borderRadius: 50
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
    fontFamily: theme.fonts.regular,
    color: theme.colors.primaryWhite,
    fontSize: 22
  }
});
