import { View, Text, StyleSheet, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { theme } from "../../theme";
import user from "../../assets/user.png"

export function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoUser}>
          <Image source={user} style={styles.avatar}/>
          <Text style={styles.userName}>Joao</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: RFPercentage(18),
    width: RFPercentage(100),
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
});
