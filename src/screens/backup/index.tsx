import { View, StyleSheet, Text } from "react-native";

export function Backup() {
  return <View style={styles.container}>
    <Text>Senhas</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
