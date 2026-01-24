import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type props = {
    username?: string;
    title: string;
    role?: string;
}

export const Header = (props: props) => {
    return (
        <View style={styles.container}>
            <View style={styles.userinfo}>
                {props.username && <Text style={styles.username}>{props.username}</Text>}
                <Text style={styles.title}>{props.title}</Text>
                {props.role && <Text style={styles.username}>{props.role}</Text>}
            </View>
            <View>
                <Ionicons name="person-circle-outline" size={40} color={Colors.placeHolder}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },

    title: {
        fontWeight: "600",
        fontSize: 18
    },
    userinfo: {
        width: "80%",
        gap: 5
    },
    username: {
        fontSize: 13
    }
})