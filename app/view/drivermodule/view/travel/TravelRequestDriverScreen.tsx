import { PassengerOutput } from "@/app/infra/service/travel/TravelOutput";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, FlatList, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useAcceptRequestTravel } from "../../infra/hooks/travel/useAcceptRequestTravel";
import { useFindTravelById } from "../../infra/hooks/travel/useFindTravelById";
import { TravellerCard } from "../components/card/TravellerCard";
import { TravelRequestInfo } from "../components/card/TravellRequestInfo";
import { HeaderBack } from "../components/header/HeaderBack";
import { Modal } from "../components/modal/Modal";

export default function TravelRequestDriverScreen() {
    const route = useRoute<RouteProp<RootStackParamList, "travelRequestDriver">>();
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

    const travelId = route.params?.data?.id;

    const travellerModelRef = useRef<Modalize>(null);
    const acceptModelRef = useRef<Modalize>(null);
    const declineModelRef = useRef<Modalize>(null);
    const [travellerInfo, setTravellerInfo] = useState<PassengerOutput>({firstName: "", id: "", lastName: "", phoneNumber: "", requestedAt: "", status: ""});

    const {data, handleFetch, isLoading} = useFindTravelById();

    const {handleSubmit: handleAccept, isLoading: loadingAcceptButton} = useAcceptRequestTravel(travelId, travellerInfo.id);

    const {handleSubmit: handleRefuse, isLoading: loadingRefuseButton} = useAcceptRequestTravel(travelId, travellerInfo.id);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        
        await handleFetch(travelId);
        
        setRefreshing(false);
    }, [travelId]);

    useEffect(() => {
        handleFetch(travelId);
    }, [])


    const openTravellerModal = (info: any) => {
        setTravellerInfo(info);
        setTimeout(() => {
            travellerModelRef.current?.open();
        }, 100)
    };

    const declineRequest = async (id: string) => {
        const res = await handleRefuse()
        if(res) {
            setTimeout(() => {
                declineModelRef.current?.open();
            }, 100)
        }
    };

    const acceptRequest = async (id: string) => {
        const res = await handleAccept();
        if(res) {
            setTimeout(() => {
                acceptModelRef.current?.open();
            }, 100)
        }
    };

    return (
        <View style={styles.mainContent}>
            <StatusBar barStyle="dark-content" />
            <HeaderBack isOtp={false} title="Gestão de Pedidos" />

            <View style={styles.tripSummaryCard}>
                <View style={styles.tripInfoShort}>
                    <Text style={styles.tripRoute}>{data?.origin} → {data?.destiny}</Text>
                    <Text style={styles.tripDate}>{data?.dateToTravel.split('T')[0]}</Text>
                </View>
                <TouchableOpacity 
                    style={styles.detailsButton}
                    onPress={() => navigate.navigate("traveldetailsDriver", { id: data?.id })}
                >
                    <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.subtitle}>Solicitações Pendentes</Text>
                <View style={styles.countBadge}>
                    <Text style={styles.countText}>{data?.pendingPassanger?.length || 0}</Text>
                </View>
            </View>

            <FlatList
                data={data?.pendingPassanger}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        onPress={() => openTravellerModal(item)} 
                        style={styles.cardWrapper} 
                        activeOpacity={0.7}
                    >
                        <TravellerCard 
                            amount={data?.price || 0} 
                            destiny={data?.destiny || '-'} 
                            name={`${item.firstName} ${item.lastName}`} 
                            origin={data?.origin || '-'} 
                            status={item.status} 
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="mail-open-outline" size={60} color={Colors.placeholderText} />
                        <Text style={styles.emptyText}>Tudo em dia!</Text>
                        <Text style={styles.emptySubtext}>Não há novas solicitações para esta boleia.</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                onRefresh={onRefresh}
                refreshing={isLoading}
                refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
            />

            <Modal
                height={500}
                ref={travellerModelRef}
                component={
                    <View style={styles.modalContent}>
                        <View style={styles.modalHandle} />
                        <TravelRequestInfo
                            loadingAcceptButton={loadingAcceptButton}
                            loadingRefuseButton={loadingRefuseButton}
                            price={data?.price || 0}
                            name={travellerInfo.firstName+' '+travellerInfo.lastName} 
                            origin=""
                            accept={() => acceptRequest(travellerInfo?.id)}  
                            decline={() => declineRequest(travellerInfo?.id)}
                        />
                    </View>
                }
            />

           <Modal
                height={300}
                ref={acceptModelRef}
                component={
                    <View style={styles.behaviorModal}>
                        <View style={styles.modalHandle} />

                        <View style={styles.successIconCircle}>
                            <Ionicons name="checkmark" size={40} color="#fff" />
                        </View>

                        <Text style={styles.modalTitle}>Solicitação Aceita!</Text>
                        
                        <Text style={styles.modalSubTitle}>
                            {travellerInfo?.firstName} foi notificado e já pode ver os detalhes da viagem.
                        </Text>

                        <View style={styles.dismissContainer}>
                            <Ionicons name="chevron-down" size={20} color={Colors.placeholderText} />
                            <Text style={styles.dismissText}>Deslize para baixo para fechar</Text>
                        </View>
                    </View>
                }
            />


           <Modal
                height={250}
                ref={declineModelRef}
                component={
                    <View style={styles.behaviorModal}>
                        <View style={styles.modalHandle} />

                        <View style={styles.errorIconCircle}>
                            <Ionicons name="close" size={40} color="#fff" />
                        </View>

                        <Text style={styles.modalSubTitle}>A solicitação foi removida da sua lista.</Text>

                        <View style={styles.dismissContainer}>
                            <Ionicons name="chevron-down" size={20} color={Colors.placeholderText} />
                            <Text style={styles.dismissText}>Deslize para baixo para fechar</Text>
                        </View>
                    </View>
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
        paddingVertical: 30,
    },
    tripSummaryCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    tripInfoShort: {
        flex: 1,
    },
    tripRoute: {
        fontWeight: '700',
        fontSize: 14,
        color: '#212529',
    },
    tripDate: {
        fontSize: 12,
        color: Colors.placeholderText,
        marginTop: 2,
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailsButtonText: {
        color: Colors.primary,
        fontWeight: '600',
        fontSize: 13,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 25,
        marginBottom: 10,
    },
    subtitle: {
        fontWeight: '700',
        fontSize: 16,
        color: '#495057',
    },
    countBadge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    countText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardWrapper: {
        marginBottom: 12,
    },
    emptyContainer: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#212529',
        marginTop: 15,
    },
    emptySubtext: {
        fontSize: 14,
        color: Colors.placeholderText,
        textAlign: 'center',
        marginTop: 5,
        paddingHorizontal: 40,
    },
    modalContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    behaviorModal: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
        flex: 1,
    },
    modalHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 20,
    },
    successIconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.success || '#28a745',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    errorIconCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.error || '#dc3545',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#212529',
    },
    modalSubTitle: {
        fontSize: 14,
        color: Colors.placeholderText,
        textAlign: 'center',
        marginBottom: 15,
    },
    dismissContainer: {
        alignItems: 'center',
        marginTop: 'auto',
        paddingBottom: 10,
    },
    dismissText: {
        fontSize: 12,
        color: Colors.placeholderText,
        fontWeight: '500',
        marginTop: 2,
    }

});