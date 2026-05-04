import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Switch, Text, View } from "react-native";
import { HeaderBack } from "../components/header/HeaderBack";

export default function NotificationsScreen() {

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

    const [settings, setSettings] = useState({
        newRequests: true,
        tripUpdates: true,
        promotions: false
    });

    const toggle = (key: keyof typeof settings) => 
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Notificações" description="Escolha quais alertas deseja receber no seu telemóvel." />
            
            <View style={styles.list}>
                <NotificationItem 
                    title="Minhas Solicitações" //Mudar para -> Minhas Solicitações 
                    desc="Avisar quando um passageiro pedir boleia." // Mudar para -> Avisar quando o motorista aceitar minha boleia
                    value={settings.newRequests} 
                    onToggle={() => toggle('newRequests')} 
                />
                <NotificationItem 
                    title="Atualizações de Viagem" 
                    desc="Alertas sobre cancelamentos ou mudanças." 
                    value={settings.tripUpdates} 
                    onToggle={() => toggle('tripUpdates')} 
                />
            </View>
        </View>
    );
}

const NotificationItem = ({ title, desc, value, onToggle }: any) => (
    <View style={styles.item}>
        <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemDesc}>{desc}</Text>
        </View>
        <Switch 
            value={value} 
            onValueChange={onToggle} 
            trackColor={{ false: "#DDD", true: Colors.primary }} 
        />
    </View>
);

const styles = StyleSheet.create({
    mainContent: {
        flex: 1, 
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
        paddingTop: 60
    },
    list: {
        padding: 20,
        gap: 20
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0"
    },
    itemTitle: { 
        fontSize: 16,
        fontWeight: "600", 
        color: "#333" },
    itemDesc: { 
        fontSize: 13, 
        color: Colors.placeholderText, 
        marginTop: 2 }
});