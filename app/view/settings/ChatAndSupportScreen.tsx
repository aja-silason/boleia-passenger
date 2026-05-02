import { useRequestSupport } from "@/app/infra/hooks/setting/useRequestSupport";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
    BackHandler,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { Button } from "../components/button/Button";
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

    const {data, handleChange, handleSubmit, isLoading} = useRequestSupport();

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: Colors.whiteBackground }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}>
            <HeaderBack />
                <View style={styles.header}>
                    <Text style={styles.title}>Como podemos ajudar?</Text>
                    <Text style={styles.subtitle}>
                        Descreva o problema ou dúvida que você está enfrentando. Seja o mais específico possível.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Escreva aqui o seu ponto de vista ou problema..."
                        placeholderTextColor={Colors.placeholderText}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        value={data.description}
                        onChangeText={(value) => handleChange("description", value)}
                    />
                </View>

                <Button text="Enviar" onPress={handleSubmit} isPrimary isLoading={isLoading} />

                <View style={styles.footerInfo}>
                    <Ionicons name="information-circle-outline" size={16} color={Colors.placeholderText} />
                    <Text style={styles.infoText}>Tempo médio de resposta: 24 horas.</Text>
                </View>
            </ScrollView>
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
});