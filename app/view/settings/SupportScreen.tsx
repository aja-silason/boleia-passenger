import { Colors } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { MenuButton } from "../components/button/MenuButton";
import { HeaderBack } from "../components/header/HeaderBack";

export default function SupportScreen() {
    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Ajuda e Suporte" description="Como podemos ajudar você hoje?" />
            
            <View style={{ padding: 20, gap: 10 }}>
                <MenuButton icon="chatbubbles-outline" text="Chat com Suporte" onPress={() => {}} />
                <MenuButton icon="mail-outline" text="Enviar E-mail" onPress={() => {}} />
                <MenuButton icon="call-outline" text="Ligar para Central" onPress={() => {}} />
                <MenuButton icon="document-text-outline" text="Termos de Uso" onPress={() => {}} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
        paddingTop: 20,
    }}
);