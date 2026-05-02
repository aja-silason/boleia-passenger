import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "../shared/context/auth.context";
import { RootStackParamList } from "../shared/route";
import { MenuButton } from "./components/button/MenuButton";

export default function SettingsScreen() {
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

    const {userInformation} = useAuthContext();

    const handleLogout = () => {
        Alert.alert("Terminar Sessão", "Tem certeza que deseja sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    await AsyncStorage.clear();
                    navigate.replace("signin")
                }
            }
        ]);
    };

    return (
        <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={40} color={Colors.primary} />
                </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>{userInformation?.firstName +' '+ userInformation?.lastName || '-'}</Text>
                    <View style={styles.roleBadge}>
                        <Text style={styles.roleText}>Passageiro</Text>
                    </View>
                </View>
            </View>

            <View style={styles.menuGroup}>
                <Text style={styles.groupTitle}>Minhas Informações</Text>
                <View style={styles.card}>
                    <View style={styles.divider} />
                    <MenuButton 
                        icon="person-outline" 
                        text="Dados da Conta" 
                        onPress={() => Alert.alert("Conta")} 
                    />
                    <View style={styles.divider} />
                    <MenuButton 
                        icon="notifications-outline" 
                        text="Notificações" 
                        onPress={() => navigate.navigate("notifications")} 
                    />
                </View>
            </View>

            <View style={styles.menuGroup}>
                <Text style={styles.groupTitle}>Ajuda e Segurança</Text>
                <View style={styles.card}>
                    <MenuButton 
                        icon="lock-closed-outline" 
                        text="Privacidade e Segurança" 
                        onPress={() => Alert.alert("Segurança")} 
                    />
                    <View style={styles.divider} />
                    <MenuButton 
                        icon="help-circle-outline" 
                        text="Ajuda e Suporte" 
                        onPress={() => navigate.navigate("supportScreen")} 
                    />
                </View>
            </View>

            <View style={[styles.menuGroup, { marginBottom: 50 }]}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
                    <Text style={styles.logoutText}>Terminar sessão</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        marginTop: 60,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F0F7FF",
        justifyContent: "center",
        alignItems: "center",
    },
    profileInfo: {
        flex: 1,
        marginLeft: 15,
    },
    userName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },
    roleBadge: {
        backgroundColor: "#E8F5E9",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginTop: 4,
    },
    roleText: {
        fontSize: 12,
        color: "#2E7D32",
        fontWeight: "600",
    },
    editButton: {
        padding: 8,
    },
    menuGroup: {
        marginBottom: 25,
    },
    groupTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: Colors.placeholderText,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
        marginLeft: 5,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#F0F0F0",
    },
    divider: {
        height: 1,
        backgroundColor: "#F8F9FA",
        width: "100%",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF5F5",
        padding: 16,
        borderRadius: 16,
        gap: 10,
        borderWidth: 1,
        borderColor: "#FFE5E5",
    },
    logoutText: {
        color: "#FF3B30",
        fontWeight: "700",
        fontSize: 16,
    },
});