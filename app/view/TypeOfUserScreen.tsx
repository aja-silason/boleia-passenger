import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../shared/route";

export default function TypeOfUserScreen({ navigation }: any) {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    const handleSelectPassenger = () => {
        navigate.navigate("signup");
    };

    const handleSelectDriver = () => {
        navigate.navigate("signupDriver");
    };

    return (
        <View style={styles.mainContent}>
            {/* Cabeçalho de Boas-Vindas */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Como deseja viajar?</Text>
                <Text style={styles.subtitle}>
                    Escolha o tipo de conta ideal para o que você precisa agora.
                </Text>
            </View>

            <View style={styles.cardsContainer}>
                
                <TouchableOpacity 
                    style={styles.card} 
                    activeOpacity={0.8}
                    onPress={handleSelectPassenger}
                >
                    <View style={[styles.iconContainer, styles.passengerIconBg]}>
                        <Ionicons name="person" size={28} color="#007AFF" />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>Passageiro</Text>
                        <Text style={styles.cardDescription}>
                            Quero pedir uma boleia de forma rápida e segura.
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.card} 
                    activeOpacity={0.8}
                    onPress={handleSelectDriver}
                >
                    <View style={[styles.iconContainer, styles.driverIconBg]}>
                        <FontAwesome5 name="car" size={26} color="#34C759" />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.cardTitle}>Motorista</Text>
                        <Text style={styles.cardDescription}>
                            Quero rentabilizar as minhas viagens oferecendo boleias.
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

            </View>
            
            <Text style={styles.footerText}>Boleia © {new Date().getFullYear()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: "#F8F9FA", // Fundo claro e limpo
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1C1C1E",
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        lineHeight: 22,
        paddingHorizontal: 10,
    },
    cardsContainer: {
        gap: 16, // Espaçamento moderno entre os cards (suportado no RN recente)
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        // Sombra suave para o iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        // Sombra suave para o Android
        elevation: 3,
    },
    iconContainer: {
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    passengerIconBg: {
        backgroundColor: "#E5F2FF", // Azul claro de fundo
    },
    driverIconBg: {
        backgroundColor: "#EAF9EE", // Verde claro de fundo
    },
    cardTextContainer: {
        flex: 1,
        paddingRight: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1C1C1E",
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 13,
        color: "#8E8E93",
        lineHeight: 18,
    },
    footerText: {
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        color: "#AEAEB2",
        fontSize: 12,
    }
});