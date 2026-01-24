import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
    placeholder: string;
    onPress: VoidFunction;
    title: string,
    icon?: ReactNode,
    type?: "telephoneNumber" | "creditCardNumber" | "emailAddress" | "postalCode",
    isHalf?: boolean
}

export const ButtonInLine = (props: props) => {
    return (
        <View style={[styles.container, props.isHalf && styles.half]}>
            <View style={{flexDirection: "row", alignItems: "center", borderBottomWidth: 1, padding: 10, borderColor: Colors.placeHolder}}>
                <TouchableOpacity style={styles.input} activeOpacity={.8} onPress={props.onPress}>
                    <View style={{flexDirection: "row"}}>
                        {props.icon}
                    </View>
                    <Text style={{color: Colors.placeHolder}}>{props.title}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        gap: 10
    },
    half:{
        width: "48%"
    },
    input: {
        width: "95%",
        padding: 5,
        flexDirection: "row",
        gap: 5
    },
    title: {
        fontWeight: 500
    }

})
