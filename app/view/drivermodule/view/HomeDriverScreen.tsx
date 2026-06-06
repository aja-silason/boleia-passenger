import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo } from "react";
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useGetAllTravel } from "../infra/hooks/travel/useGetAllTravel";
import { Button } from "./components/button/Button";
import { RequestTravelCard } from "./components/card/RequestTravleCard";
import { TravelCard } from "./components/card/TravelCard";
import { Header } from "./components/header/Header";

export default function HomeDriverScreen() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { userInformation } = useAuthContext();
    const { data, isLoading, handleFetch } = useGetAllTravel();

    useEffect(() => {
        handleFetch();
    }, []);

    const totalPendingRequests = useMemo(() => {
        if (!data) return 0;
        return data.reduce((acc, travel) => acc + (travel.pendingPassanger?.length || 0), 0);
    }, [data]);

    const totalEarnings = useMemo(() => {
        if (!data) return "0,00";
        const total = data.filter(travels => travels.status.includes("COMPLETED"))?.reduce((acc, travel) => acc + (Number(travel.valuePaid) || 0), 0);
        return total.toLocaleString('pt-AO', { minimumFractionDigits: 2 });
    }, [data]);

    return (
        <View style={styles.mainContent}>
            <StatusBar barStyle="dark-content" />
            
            <Header 
                title="Painel do Motorista" 
                username={`Olá, ${userInformation?.firstName}`}
            />

            <View style={styles.earningsCard}>
                <View>
                    <Text style={styles.earningsLabel}>Ganho Total</Text>
                    <Text style={styles.earningsValue}>{totalEarnings} Kz</Text>
                </View>
                <View style={styles.earningsIcon}>
                    <Ionicons name="wallet" size={24} color={Colors.primary} />
                </View>
            </View>
 
            <View style={styles.actionSection}>
                <Button 
                    isLoading={false} 
                    onPress={() => navigate.navigate("publishtravelDriver")} 
                    text="Publicar nova Boleia" 
                    isPrimary 
                    icon={<Ionicons name="add-circle-outline" size={22} />} 
                />

                {totalPendingRequests > 0 && (
                    <RequestTravelCard traveler={totalPendingRequests}/>
                )}
            </View>

            <View style={styles.listHeader}>
                <Text style={styles.title}>Minhas Viagens Recentes</Text>
                <TouchableOpacity onPress={handleFetch}>
                    <Text style={styles.seeAll}>Atualizar</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{paddingVertical: 20}}
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigate.navigate("travelRequestDriver", { data: item })} 
                        style={styles.cardContainer} 
                        activeOpacity={0.7}
                    >
                        <TravelCard data={item} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptylist}>
                        <Ionicons name="car-outline" size={50} color={Colors.placeHolder} />
                        <Text style={styles.emptytext}>Você ainda não criou nenhuma viagem.</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={handleFetch} tintColor={Colors.primary} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    errorContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    earningsCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    earningsLabel: {
        fontSize: 12,
        color: Colors.placeHolder,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 1
    },
    earningsValue: {
        fontSize: 22,
        fontWeight: "800",
        color: "#212529",
        marginTop: 4
    },
    earningsIcon: {
        backgroundColor: "#F0F7FF",
        padding: 12,
        borderRadius: 12
    },
    actionSection: {
        paddingVertical: 20,
        gap: 12
    },
    listHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    title: {
        fontWeight: "700",
        fontSize: 16,
        color: "#343A40"
    },
    seeAll: {
        color: Colors.primary,
        fontSize: 13,
        fontWeight: "600"
    },
    cardContainer: {
        marginBottom: 12
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
        paddingHorizontal: 40
    }
});