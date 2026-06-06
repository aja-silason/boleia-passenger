import { TravelStatus } from "@/app/infra/hooks/travel/TravelStatus";
import { useFinishTravel } from "@/app/infra/hooks/travel/useFinishTravel";
import { useStartTravel } from "@/app/infra/hooks/travel/useStartTravel";
import { PassengerOutput } from "@/app/infra/service/travel/TravelOutput";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFindTravelById } from "../../infra/hooks/travel/useFindTravelById";
import { BlueButton } from "../components/button/BlueButton";
import { HeaderBack } from "../components/header/HeaderBack";

export default function TravelDetailsDriverScreen() {
    const route = useRoute<RouteProp<RootStackParamList, "traveldetailsDriver">>();
    const travelId = route.params?.id;
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

    const {data, handleFetch, isLoading} = useFindTravelById();

    const { handleSubmit: handleStart, isLoading: isStarting } = useStartTravel(travelId);
    const { handleSubmit: handleFinish, isLoading: isFinishing } = useFinishTravel(travelId);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        
        await handleFetch(travelId);
        
        setRefreshing(false);
    }, [travelId]);

    useEffect(() => {
        handleFetch(travelId);
    }, [])

    const isStarted = data?.status === "STARTED";
    
    const totalPassengers = data?.availablePassangers?.length || 0;
    const travelPrice = totalPassengers * (data?.price || 0);

    const dateObj = data?.dateToTravel ? new Date(data.dateToTravel) : new Date();
    const formattedDate = dateObj.toLocaleDateString('pt-PT');
    const formattedTime = dateObj.toLocaleTimeString('pt-PT');

    const handleAction = async () => {
        if (isStarted) {
            await handleFinish();
            navigate.replace("travelFinishSplah");
        } else {
            await handleStart();
            onRefresh();
        }
    };

    const isCompleted = data?.status === TravelStatus.COMPLETED;


    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Resumo da Boleia" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing || isLoading}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                        tintColor={Colors.primary}
                    />
                }
                keyboardShouldPersistTaps="handled"
                >

                
                <View style={styles.requesttravel}>
                    <Text style={styles.sectionLabel}>ITINERÁRIO</Text>
                    <View style={styles.routeRow}>
                        <View style={styles.routePoint}>
                            <Ionicons name="radio-button-on" size={16} color={Colors.primary} />
                            <Text style={styles.locationText}>{data?.origin}</Text>
                        </View>
                        <View style={styles.routeLine} />
                        <View style={styles.routePoint}>
                            <Ionicons name="location" size={16} color="#E74C3C" />
                            <Text style={styles.locationText}>{data?.destiny}</Text>
                        </View>
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <View style={styles.infoBadge}>
                            <Ionicons name="calendar-outline" size={14} color={Colors.placeholderText} />
                            <Text style={styles.infoBadgeText}>{formattedDate}</Text>
                        </View>
                        <View style={styles.infoBadge}>
                            <Ionicons name="time-outline" size={14} color={Colors.placeholderText} />
                            <Text style={styles.infoBadgeText}>Partida: {formattedTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.requesttravel}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionLabel}>PASSAGEIROS CONFIRMADOS</Text>
                        <Text style={styles.countText}>{totalPassengers} lugares</Text>
                    </View>
                    
                    <View style={styles.passengerList}>
                        {data?.availablePassangers.map((item: PassengerOutput, index: number) => (
                            <View style={styles.passengerItem} key={item.id || index}>
                                <Ionicons name="person-circle" size={24} color={Colors.placeholderText} />
                                <Text style={styles.passengerName}>{item.firstName} {item.lastName}</Text>
                                <View style={styles.statusConfirmed}>
                                    <Text style={styles.statusText}>Confirmado</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={[styles.requesttravel, { backgroundColor: '#F8F9FF', borderColor: Colors.primary }]}>
                    <Text style={styles.sectionLabel}>RESUMO FINANCEIRO</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.detailsInfoTitle}>Preço por lugar:</Text>
                        <Text style={styles.detailsInfoValue}>{data?.price?.toLocaleString()} Kz</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.priceRow}>
                        <Text style={styles.totalLabel}>{isCompleted ? 'Total Pago' : 'Total a receber'}:</Text>
                        <Text style={styles.totalValue}>{travelPrice?.toLocaleString()} Kz</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footerAction}>
                {isCompleted ? null : (
                    <BlueButton 
                        onPress={handleAction} 
                        isBlue={!isStarted}
                        isLoading={isStarting || isFinishing}
                        text={isStarted ? "Finalizar Viagem" : "Iniciar Viagem Agora"}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        backgroundColor: Colors.whiteBackground,
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: "800",
        color: Colors.placeholderText,
        letterSpacing: 1,
        marginBottom: 10,
    },
    requesttravel: {
        borderColor: "#F0F0F0",
        borderWidth: 1,
        marginVertical: 8,
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#FFF",
    },
    startedBadge: {
        backgroundColor: Colors.primary,
        padding: 5,
        borderRadius: 5,
        alignSelf: 'center',
        marginBottom: 10
    },
    startedBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold'
    },
    routeRow: {
        gap: 8,
        marginBottom: 15,
    },
    routePoint: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    routeLine: {
        width: 1,
        height: 15,
        backgroundColor: "#DDD",
        marginLeft: 7,
    },
    locationText: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
    },
    dateTimeContainer: {
        flexDirection: "row",
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: "#F5F5F5",
        paddingTop: 12,
    },
    infoBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 5,
    },
    infoBadgeText: {
        fontSize: 12,
        color: "#666",
        fontWeight: "500",
    },
    rowBetween: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    countText: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.primary,
    },
    passengerList: {
        marginTop: 5,
        gap: 10,
    },
    passengerItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FCFCFC",
        padding: 8,
        borderRadius: 8,
        gap: 10,
    },
    passengerName: {
        flex: 1,
        fontSize: 14,
        fontWeight: "500",
    },
    statusConfirmed: {
        backgroundColor: "#E8F5E9",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusText: {
        fontSize: 10,
        color: "#2E7D32",
        fontWeight: "700",
    },
    priceRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 2,
    },
    detailsInfoTitle: {
        fontSize: 13,
        color: "#777",
    },
    detailsInfoValue: {
        fontSize: 13,
        fontWeight: "600",
    },
    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 10,
        borderStyle: 'dashed',
    },
    totalLabel: {
        fontSize: 15,
        fontWeight: "700",
        color: "#333",
    },
    totalValue: {
        fontSize: 18,
        fontWeight: "800",
        color: Colors.primary,
    },
    footerAction: {
        // position: 'absolute',
        bottom: 40,
        // left: 20,
        // right: 20,
        backgroundColor: '#FFF',
    },
});