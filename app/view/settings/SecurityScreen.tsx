import { useDeactiveUser } from "@/app/infra/hooks/setting/useDeactiveUser";
import { useReplacePassword } from "@/app/infra/hooks/useReplacePassword";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";

export default function SecurityScreen () {

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

    const {handleSubmit, isLoading} = useDeactiveUser();

    const {handleChange, handleSubmit: submitChange, isLoading: loadingChangePassword} = useReplacePassword();

    return (
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: Colors.whiteBackground }}
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
            >
            <View style={styles.container}>
            <HeaderBack />
                <View style={styles.header}>
                    <Text style={styles.title}>Segurança</Text>
                </View>

                <View style={{gap: 10}}>
                    <Input onChange={(value: string) => handleChange("oldPassword", value)} placeholder="" title="Senha Antiga"/>
                    <Input onChange={(value: string) => handleChange("confirmedPassword", value)} placeholder="" title="Nova senha"/>
                    <Button text="Apagar a minha conta" isLoading={loadingChangePassword} isPrimary={true} onPress={submitChange} style={{color: "red"}}/>
                </View>

                <View style={{borderTopWidth: 1, borderColor: Colors.placeHolder, marginVertical: 10}}></View>

                <View style={styles.dangerZone}>
                    <Text style={styles.dangerColor}>Zona Perigosa</Text>
                    <Text style={[styles.dangerColor, {fontSize: 12, opacity: 0.8}]}>Cuidado, está ação não terá reversão, caso tenha dúvidas contacte o nosso suporte.</Text>
                    <Button text="Apagar a minha conta" isLoading={isLoading} isPrimary={false} onPress={handleSubmit} style={{backgroundColor: Colors.dangerColor}}/>
                </View>


            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 10,
    },
    innerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        lineHeight: 22,
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: 15,
        minHeight: 200,
        marginBottom: 25
    },
    textArea: {
        fontSize: 16,
        color: "#1A1A1A",
        height: "40%",
    },
    submitButton: {
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 16,
        gap: 10,
    },
    disabledButton: {
        backgroundColor: "#A0A0A0",
        opacity: 0.6,
    },
    submitText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    footerInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        gap: 5,
    },
    infoText: {
        fontSize: 13,
        color: Colors.placeholderText,
    },
    emptylist: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        gap: 10
    },
    emptytext: {
        color: Colors.placeHolder,
        textAlign: "center",
        fontSize: 14,
    },
    dangerZone: {
        gap: 10
    },
    dangerColor: {
        color: Colors.dangerColor
    }
});