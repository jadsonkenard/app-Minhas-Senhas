import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Menu } from "../../components";

export function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.viewImage}>
        <Text>Foto</Text>
      </View>
      <View style={styles.viewMenu}>
        <Menu title="Nome"/>
        <Menu title="Nome completo"/>
        <Menu title="Nome lllllllllllll"/>
        <Menu title="Nome fffffff"/>
      </View>
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
});
