import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    isError?: boolean;
    text: string;
    icon: any,
    onPress: VoidFunction
}

export const MenuButton = (props: props) => {
    return (
        <TouchableOpacity style={styles.constainer} activeOpacity={.8} onPress={props.onPress}>
            <Ionicons name={props.icon} size={15} color={ props.isError ? Colors.error : Colors.blackText}/>
            <Text style={[styles.text, props.isError && styles.error]}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        backgroundColor: Colors.cardBackground,
        padding: 10,
        borderRadius: 5
    },
    text: {
        color: Colors.blackText
    },
    error: {
        color: Colors.error
    }
});