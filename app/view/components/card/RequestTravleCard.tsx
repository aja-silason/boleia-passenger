import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
    traveler: number;
    onPress: VoidFunction
}

export const RequestTravelCard = (props: props) => {
    return(
        <TouchableOpacity style={styles.container} onPress={props.onPress} activeOpacity={.8}>
            <View style={styles.head}>
                <Ionicons name="warning-outline" size={15} color={Colors.orange}/>
                <Text style={styles.title}>Nova Solicitação</Text>
            </View>
            <View style={styles.body}>
                <Text>Passageiros</Text>
                <Text>{props.traveler || 0}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderLeftWidth: 8,
        borderColor: Colors.orange,
        padding: 10,
        paddingVertical: 20,
        borderRadius: 8,
        gap: 10
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    title: {
        fontSize: 15,
        fontWeight: "600"
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottom: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})