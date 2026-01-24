import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { MenuButton } from "./components/button/MenuButton";
import { Header } from "./components/header/Header";

type menu = {
    iconname: string;
    label: string;
    onPress: VoidFunction;
    isError?: boolean
}

export default function SettingsScreen() {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const menu: menu[] = [
        {iconname: "list", label: "Conta", onPress: () => Alert.alert("Conta")},
        {iconname: "notifications-outline", label: "Notificações", onPress: () => Alert.alert("Notificações")},
        {iconname: "lock-closed-outline", label: "Privacidade e Segurança", onPress: () => Alert.alert("Privacidade e Segurança")},
        {iconname: "information-circle-outline", label: "Ajuda e Suporte", onPress: () => Alert.alert("Ajuda e suporte")},
        {iconname: "log-out-outline", label: "Terminar sessão", onPress: () => navigate.replace("signin"), isError: true},
    ]

    return (
        <View style={styles.mainContent}>
            <Header title="Anania Augusto" role="Motorista"/>

            <View style={styles.menu}>
                {
                    menu?.map((item, index) => (
                        <MenuButton icon={item.iconname} text={item.label} isError={item.isError} onPress={item.onPress} key={index}/>
                    ))
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "#fff",
        flex: 1,
        gap: 20
    },
    wrap: {
        flexWrap: "wrap"
    },
    menu: {
        gap: 10
    }
})