import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    text: string;
    isPrimary: boolean;
    isLoading: boolean;
    onPress: () => void;
    halfWidth?: boolean;
}

export const LinkButton = (props: props) => {
    return (
        <TouchableOpacity style={[style.container]} activeOpacity={.8} onPress={props.onPress}>
            <Text style={style.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderColor: Colors.text
    },
    text: {
        borderBottomWidth: 1,
        fontSize: 13,
        fontWeight: "500"
    }
});