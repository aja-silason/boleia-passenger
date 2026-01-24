import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    text: string;
    isPrimary: boolean;
    isLoading: boolean;
    onPress: () => void;
    halfWidth?: boolean;
    icon?: ReactNode
}

export const Button = (props: props) => {
    return (
        <TouchableOpacity style={[style.container, props.isPrimary ? style.primary : style.secundary, props.halfWidth && style.middleSize]} activeOpacity={.7} onPress={props.onPress}>
            {props.icon}
            <Text style={[props.isPrimary ? style.textPrimary : style.textSecundary]}>{props.text}</Text>
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
        borderColor: Colors.text,
        flexDirection: "row",
        gap: 5
    },
    middleSize: {
        flex: 1
    },
    primary: {
        backgroundColor: Colors.primary
    },
    secundary: {
        borderWidth: 1
    },
    textPrimary: {
        fontWeight: "600",
        fontSize: 13
    },
    textSecundary: {
        fontWeight: "500",
        fontSize: 13,
        color: Colors.text
    }
});