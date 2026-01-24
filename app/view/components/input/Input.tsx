import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type props = {
    placeholder: string;
    onChange: (e: string) => void;
    title: string,
    icon?: ReactNode,
    type?: "telephoneNumber" | "creditCardNumber" | "emailAddress" | "postalCode",
    value?: string | any;
    isHalf?: boolean
}

export const Input = (props: props) => {
    return (
        <View style={[styles.container, props.isHalf && styles.half]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={{flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 10, borderColor: Colors.placeHolder, borderRadius: 10}}>
                <View style={{flexDirection: "row"}}>
                    {props.icon}
                </View>
                <TextInput placeholder={props.placeholder} placeholderTextColor={Colors.placeHolder} style={styles.input} textContentType={props.type ?? "none"} onChangeText={props.onChange} value={props.value} defaultValue={props.value}/>
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
        color: Colors.blackText
    },
    title: {
        fontWeight: 500
    }

})
