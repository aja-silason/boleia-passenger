import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BackHandler, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

import { useGetAllVehicles } from "@/app/infra/hooks/vehicle/useGetAllVehicles";
import { RootStackParamList } from "@/app/shared/route";
import { useEffect } from "react";
import { AddButton } from "../components/button/AddButton";
import { VehicleCard } from "../components/card/VehicleCard";
import { HeaderBack } from "../components/header/HeaderBack";

export default function MyVehiclesDriverScreen() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { data, isLoading, handleFetch } = useGetAllVehicles();

    useEffect(() => {
        handleFetch()
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
            <View style={styles.header}>
                <HeaderBack title="Meus Veículos" />            
                <View style={styles.header}>
                    <AddButton action={() => navigate.navigate("registerMyVehicle")} title="Adicionar" />
                </View>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigate.navigate("vehicleDetailsDriver" , { data: item })} 
                        style={styles.card} 
                        activeOpacity={0.8}
                    >
                        <VehicleCard data={item} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Você ainda não possui veículos cadastrados.</Text>
                        <Text style={styles.emptyText}></Text>
                        <Text style={[styles.emptyText, {fontSize: 10}]}>Ou arraste para baixo para actualizar a lista</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={handleFetch} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: "#fff",
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    title: {
        fontWeight: "700",
        fontSize: 22,
        color: "#333"
    },
    list: {
        width: "100%",
    },
    card: {
        marginBottom: 15
    },
    emptyContainer: {
        marginTop: 50,
        alignItems: "center",
    },
    emptyText: {
        color: "#888",
        textAlign: "center",
        fontSize: 16
    }
});