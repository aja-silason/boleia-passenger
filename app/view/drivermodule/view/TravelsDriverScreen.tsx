import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { BackHandler, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { useGetAllTravel } from "../infra/hooks/travel/useGetAllTravel";
import { RootStackParamList } from "../shared/route";
import { TravelCard } from "./components/card/TravelCard";

export default function TravelsDriverScreen() {
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

    const { data, isLoading, handleFetch } = useGetAllTravel();
    
    const [activeTab, setActiveTab] = useState<'actives' | 'history'>('actives');

    const filteredData = useMemo(() => {
        if (!data) return [];
        if (activeTab === 'actives') {
            return data.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELLED');
        }
        return data.filter(t => t.status === 'COMPLETED' || t.status === 'CANCELLED');
    }, [data, activeTab]);

    return (
        <View style={styles.mainContent}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Viagens</Text>
            </View>

            <View style={styles.tabBar}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'actives' && styles.activeTab]}
                    onPress={() => setActiveTab('actives')}
                >
                    <Text style={[styles.tabText, activeTab === 'actives' && styles.activeTabText]}>Ativas</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'history' && styles.activeTab]}
                    onPress={() => setActiveTab('history')}
                >
                    <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>Histórico</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                style={{paddingVertical: 20}}
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigate.navigate("travelRequest", { data: item })} 
                        style={styles.cardContainer} 
                        activeOpacity={0.7}
                    >
                        <TravelCard data={item} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons 
                            name={activeTab === 'actives' ? "calendar-outline" : "archive-outline"} 
                            size={60} 
                            color="#CCC" 
                        />
                        <Text style={styles.emptyText}>
                            {activeTab === 'actives' 
                                ? "Você não tem nenhuma viagem agendada no momento." 
                                : "Seu histórico de viagens concluídas está vazio."}
                        </Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        refreshing={isLoading} 
                        onRefresh={handleFetch}
                        tintColor={Colors.primary} 
                    />
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
        paddingTop: 30,
    },
    header: {
        marginBottom: 15,
    },
    title: {
        fontWeight: "800",
        fontSize: 21,
        color: "#1A1A1A"
    },
    tabBar: {
        flexDirection: "row",
        backgroundColor: "#E9ECEF",
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 10,
    },
    activeTab: {
        backgroundColor: "#FFF",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6C757D",
    },
    activeTabText: {
        color: Colors.primary || "#000",
    },
    cardContainer: {
        marginBottom: 15,
    },
    emptyContainer: {
        marginTop: 80,
        alignItems: "center",
        paddingHorizontal: 40,
    },
    emptyText: {
        color: "#ADB5BD",
        textAlign: "center",
        fontSize: 16,
        marginTop: 15,
        lineHeight: 22
    }
});