import { Colors } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ReactNode, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type props = {
    placeholder: string;
    onChange: (e: string) => void;
    title: string,
    icon?: ReactNode,
    value?: string | any
}

export const InputPassword = ({onChange, placeholder, title, icon, value}: props) => {

    const [show, setShow] = useState<boolean>(false);

    const toogleContent = () => setShow(!show);

    console.log("Password information", show);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={{flexDirection: "row", alignItems: "center", borderWidth: 1, padding: 10, borderColor: Colors.placeHolder, borderRadius: 10}}>
                <View style={{flexDirection: "row"}}>
                    {icon}
                </View>
                <TextInput placeholder={placeholder} placeholderTextColor={Colors.placeHolder} style={styles.input} textContentType={"password"} onChangeText={onChange} value={value} secureTextEntry={!show}/>

                <TouchableOpacity activeOpacity={0.8} onPress={toogleContent}>
                    <Ionicons name={!show ? "eye-outline" : "eye-off-outline"} size={16} color={Colors.placeHolder}/>
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
    input: {
        width: "95%",
        padding: 5,
        color: Colors.blackText
    },
    title: {
        fontWeight: 500
    }

})
