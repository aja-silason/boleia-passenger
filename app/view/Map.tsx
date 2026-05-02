import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "./components/header/HeaderBack";

export default function Map() {
    return (
        <View style={styles.container}>
            <HeaderBack description="" />

            <SafeAreaView>
                
            </SafeAreaView>

            <Text>Esse o Mapa da boleia</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        paddingHorizontal: 20
    }
})