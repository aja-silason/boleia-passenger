import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    text: string;
    isBlue: boolean;
    isLoading: boolean;
    onPress: () => void;
}

export const BlueButton = (props: props) => {
    return (
        <TouchableOpacity style={[style.container, props.isBlue ? style.blue : style.green]} activeOpacity={.7} onPress={props.onPress}>
            <Text style={[props.isBlue ? style.textBlue : style.textGreen]}>{props.text}</Text>
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
    blue: {
        borderColor: Colors.blue,
        borderWidth: 1
    },
    green: {
        borderColor: Colors.success,
        borderWidth: 1
    },
    textBlue: {
        fontWeight: "600",
        fontSize: 13,
        color: Colors.blue
    },
    textGreen: {
        fontWeight: "600",
        fontSize: 13,
        color: Colors.success
    }
});