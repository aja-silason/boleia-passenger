import { useCancelRequestTravel } from "@/app/infra/hooks/travel/useCancelRequestTravel";
import { useGetFindByTravelId } from "@/app/infra/hooks/travel/useGetFindByTravelId";
import { useRequestTravel } from "@/app/infra/hooks/travel/useRequestTravel";
import { useAuthContext } from "@/app/shared/context/auth.context";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { BehaviorButton } from "../components/button/BehaviorButton";
import { Button } from "../components/button/Button";
import { TravellRequestInfoPendingToApprove } from "../components/card/TravellRequestInfoPendingToApprove";
import { HeaderBack } from "../components/header/HeaderBack";
import { Modal } from "../components/modal/Modal";

export default function TravelDetailsScreen(){

    const route = useRoute<RouteProp<RootStackParamList, "traveldetails">>()

    const {userInformation} = useAuthContext();

    const passangerId = userInformation ? userInformation?.id : "N-D";

    const details = route.params?.travelDetails;
    const travellerModelRef = useRef<Modalize>(null);

    const {data, handleFetch, isLoading} = useGetFindByTravelId();

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        
        await handleFetch(details?.id);
        
        setRefreshing(false);
    }, [details?.id]);

    useEffect(() => {
        handleFetch(details?.id);
    }, [details?.id])

    const {handleSubmit, isLoading: isLoadingRequestTravel, isError} = useRequestTravel(details?.id, passangerId);
    const {handleSubmit: cancelRequest, isLoading: isLoadingCancelRequestTravel} = useCancelRequestTravel(details?.id, passangerId);

    const handleRequest = async () => {
        await handleSubmit();
        if(!isLoadingRequestTravel && !isError)
            travellerModelRef.current?.open()
        onRefresh();
    }

    const handleCancelRequest = async () => {
        await cancelRequest();
        onRefresh();
    }

    console.log(JSON.stringify(data, null, 2))

    const aimAlreadyInTravel = data?.pendingPassanger?.filter(i => i?.id?.includes(passangerId))?.length === 1 ? true : false ;


    console.log(JSON.stringify(aimAlreadyInTravel, null, 2))

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Detalhes da Boleia" />
            
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing || isLoading}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                        tintColor={Colors.primary}
                    />
                }
            >
                <View style={styles.card}>
                    <View style={styles.routeContainer}>
                        <View style={styles.timeline}>
                            <View style={styles.dot} />
                            <View style={styles.line} />
                            <Ionicons name="location" size={18} color={Colors.primary} />
                        </View>
                        <View style={styles.routeDetails}>
                            <View>
                                <Text style={styles.label}>Origem</Text>
                                <Text style={styles.routeText}>{data?.origin || '-'}</Text>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.label}>Destino</Text>
                                <Text style={styles.routeText}>{data?.destiny || '-'}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="person-outline" size={18} color={Colors.primary} />
                        <Text style={styles.sectionTitle}>Motorista e Veículo</Text>
                    </View>
                    
                    <View style={styles.driverRow}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={25} color="#fff" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.driverName}>{`${data?.driver?.firstName +' '+ data?.driver?.lastName}` || '-'}</Text>
                            <View style={styles.ratingRow}>
                                <Ionicons name="star" color={Colors.orange} size={14} />
                                <Text style={styles.ratingText}>4.8 (120 avaliações)</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoGrid}>
                        <View>
                            <Text style={styles.label}>Viatura</Text>
                            <Text style={styles.value}>{data?.car?.brand || '-'}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Matrícula</Text>
                            <Text style={styles.value}>{data?.car?.plate || '-'}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="cash-outline" size={18} color={Colors.primary} />
                        <Text style={styles.sectionTitle}>Condições</Text>
                    </View>
                    <View style={styles.infoGrid}>
                        <View>
                            <Text style={styles.label}>Preço por lugar</Text>
                            <Text style={[styles.value, { color: Colors.primary, fontSize: 18 }]}>{data?.price?.toLocaleString('pt-AO', {minimumFractionDigits: 2})} KZ</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Vagas disponíveis</Text>
                            <Text style={styles.value}>{data?.availableSeats} Lugares</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {!route.params?.historic && (
                <View style={styles.footer}>
                    {
                        !aimAlreadyInTravel ? (
                            <Button 
                                isLoading={isLoadingRequestTravel}
                                onPress={handleRequest} 
                                isPrimary
                                text="Solicitar Reserva"
                            />

                        ) : (
                            <BehaviorButton isLoading isSuccess={isLoadingCancelRequestTravel} onPress={handleCancelRequest} text="Cancelar Solicitação" />
                        )   
                    }
                </View>
            )}

            {route.params?.historic && (
                <View style={styles.footer}>
                    {
                        !aimAlreadyInTravel && (
                            <Button 
                                // icon={<Ionicons name="map" color={Colors.background} />}
                                isLoading={false}
                                onPress={() => {}} 
                                isPrimary={false}
                                text="Ver mapa"
                            />

                        )   
                    }
                </View>
            )}


            <Modal
                height={500}
                ref={travellerModelRef}
                component={
                    <View style={styles.modalPadding}>
                        <TravellRequestInfoPendingToApprove 
                            travelinfo={data} 
                            accept={() => travellerModelRef.current?.close()} 
                            decline={() => travellerModelRef.current?.close()}
                        />
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        padding: 20,
        paddingVertical: 60,
        backgroundColor: "#fff",
        flex: 1
    },
    info:{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30
    },
    name: {
        fontSize: 14,
        fontWeight: "600"
    },
    evaluation: {
        flexDirection: "row",
        alignItems: "center"
    },
    evaluationtext: {
        color: Colors.placeholderText,
        fontSize: 13,
        fontWeight: "600"
    },
    modalbuttonaction: {
        flexDirection: "row",
        gap: 20
    },
    title: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5
    },
    detailsInfoTitle: {
        fontSize: 13,
        color: Colors.placeholderText
    },
    detailsInfoValue: {
        fontWeight: "600"
    },
    requesttravel: {
        borderColor: Colors.whiteBackground,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        gap: 5,
        backgroundColor: Colors.whiteBackground
    },
    datetravel: {
        fontSize: 11,
        color: Colors.placeholderText,
        fontWeight: "600"
    },
    travelduration: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    time: {
        fontWeight: "500",
        fontSize: 18
    },
    bottomInfo: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bottonTravelText: {
        fontSize: 12,
        fontWeight: "600"
    },
    bottomContentTime: {
        backgroundColor: Colors.inactive,
        padding: 1,
        paddingHorizontal: 5,
        borderRadius: 5,
        fontSize: 10
    },
    value: {
        fontWeight: 600
    },
    modal: {
        paddingHorizontal: 10
    },
    behaviorModal: {
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        height: 150
    },
    modalTitle: {
        fontSize: 15,
        fontWeight: "600"
    },
    
    scrollContainer: {
        // padding: 20,
        // paddingBottom: 10, // Espaço para o botão fixo
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        // Sombra leve
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: "#F0F0F0"
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#333",
        textTransform: "uppercase",
        letterSpacing: 0.5
    },
    label: {
        fontSize: 12,
        color: Colors.placeholderText,
        marginBottom: 2
    },
    // value: {
    //     fontSize: 15,
    //     fontWeight: "600",
    //     color: "#333"
    // },
    // Estilos da Timeline
    routeContainer: {
        flexDirection: "row",
        gap: 15,
        paddingVertical: 5
    },
    timeline: {
        alignItems: "center",
        width: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.placeholderText,
        marginTop: 5
    },
    line: {
        width: 2,
        height: 40,
        backgroundColor: "#F0F0F0",
        marginVertical: 4
    },
    routeDetails: {
        flex: 1
    },
    routeText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333"
    },
    // Motorista
    driverRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center"
    },
    driverName: {
        fontSize: 16,
        fontWeight: "700"
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    ratingText: {
        fontSize: 12,
        color: Colors.placeholderText
    },
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 15
    },
    infoGrid: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    footer: {
        // position: "absolute",
        bottom: 100,
        width: "100%",
        paddingTop: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0"
    },
    modalPadding: {
        paddingHorizontal: 15
    }
})