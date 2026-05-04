import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, StyleSheet, View } from "react-native";
import { MenuButton } from "../components/button/MenuButton";
import { HeaderBack } from "../components/header/HeaderBack";

export default function SupportScreen() {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
 
        useEffect(() => {
                const backAction = () => {
                    if(navigate.canGoBack()) {
                        navigate.goBack();
                        return true;
                    }
                    return false;
                };
        
                const backHandler = BackHandler.addEventListener(
                    'hardwareBackPress',
                    backAction
                );
        
                return () => backHandler.remove();
            }, [navigate]);

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Ajuda e Suporte" description="Como podemos ajudar você hoje?" />
            
            <View style={{ padding: 20, gap: 10 }}>
                <MenuButton icon="chatbubbles-outline" text="Chat com Suporte" onPress={() => navigate.navigate("chatAndSupport")}/>
                <MenuButton icon="call-outline" text="Ligar para Central" onPress={() => navigate.navigate("central")} />
                <MenuButton icon="document-text-outline" text="Termos de Uso" onPress={() => navigate.navigate("useTerms")} />
                <MenuButton icon="document-text-outline" text="Política de Privacidade" onPress={() => navigate.navigate("privacyPolitics")} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
        paddingTop: 60,
    }}
);