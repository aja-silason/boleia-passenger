import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    text: string;
    isSuccess: boolean;
    isLoading: boolean;
    onPress: () => void;
    halfWidth?: boolean;
}

export const BehaviorButton = (props: props) => {
    return (
        <TouchableOpacity style={[style.container, props.isSuccess ? style.success : style.error, props.halfWidth && style.middleSize]} activeOpacity={.7} onPress={props.onPress}>
            <Text style={style.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        padding: 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderColor: Colors.text
    },
    middleSize: {
        flex: 1
    },
    success: {
        backgroundColor: Colors.success
    },
    error: {
        backgroundColor: Colors.error
    },
    text: {
        fontWeight: "600",
        fontSize: 13,
        color: Colors.text
    }
});