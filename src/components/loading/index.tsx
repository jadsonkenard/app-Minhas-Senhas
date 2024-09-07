import { ActivityIndicator, StyleSheet } from "react-native";

export function Loading(){
    return(
        <ActivityIndicator style={styles.loading} size={60} color={"red"}/>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})