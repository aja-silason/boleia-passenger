import { Colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button } from "../components/button/Button";
import { TravellRequestInfoPendingToApprove } from "../components/card/TravellRequestInfoPendingToApprove";
import { HeaderBack } from "../components/header/HeaderBack";
import { Modal } from "../components/modal/Modal";

type traveller = {
    name: string
}

export default function TravelDetailsScreen(){

    // const route = useRoute<RouteProp<RootStackParamList, "traveldetails">>()

    // const details = route.params;
    const travellerModelRef = useRef<Modalize>(null);
    const [travellerInfo, setTravellerInfo] = useState<any>(null);


    const startTravel = (id: string) => {
        Alert.alert(`Travel ${id} was started`);
    }

    const travel: traveller[] = [{name: "Anania"}, {name: "Adão"}, {name: "Madalena"}]

    const openTravellerModal = () => {
        travellerModelRef.current?.open();
        // setTravellerInfo();
    }

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Detalhes da Boleia"/>
            <View>
                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <MaterialCommunityIcons name="steering" size={20} color="black" />
                        <Text style={styles.title}>Motorista</Text>
                    </View>
                    <View style={{flexDirection: "row", gap: 10}}>
                        <View>
                            <Ionicons name="person-circle-outline" size={40}/>
                        </View>
                        <View style={{flexDirection: "column"}}>
                            <Text style={styles.title}>Maria da Piedade</Text>
                            <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                                <Text style={{color: Colors.placeholderText}}>4.8</Text>
                                <Ionicons name="star" color={Colors.orange}/>
                                <Text style={{color: Colors.placeholderText}}>(120 avaliações)</Text>
                            </View>
    
                        </View>

                    </View>
                </View>

                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="car-outline" size={20}/>
                        <Text style={styles.title}>Detalhes da Viatura</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        
                        <View style={{}}>
                            <Text>Marca</Text>
                            <Text style={styles.value}>Suzuki</Text>
                        </View>

                        <View>
                            <Text>Modelo</Text>
                            <Text style={styles.value}>Swift</Text>
                        </View>

                        <View>
                            <Text>Matricula</Text>
                            <Text style={styles.value}>LD-XL-PT-OO</Text>
                        </View>

                    </View>
                </View> 

                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="car-outline" size={20}/>
                        <Text style={styles.title}>Preço e Disponibilidade</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        
                        <View style={{}}>
                            <Text>Preço</Text>
                            <Text style={styles.value}>2.500,00 kz</Text>
                        </View>

                        <View>
                            <Text>Lugares Vagos</Text>
                            <Text style={styles.value}>2</Text>
                        </View>

                        <View>
                            <Text></Text>
                            <Text style={styles.value}></Text>
                        </View>

                    </View>
                </View>

                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="map-outline" size={20}/>
                        <Text style={styles.title}>Trajecto</Text>
                    </View>

                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        
                        <View style={{}}>
                            <Text>Origem</Text>
                            <Text style={styles.value}>Kilamba</Text>
                        </View>

                        <View>
                            <Text>Destino</Text>
                            <Text style={styles.value}>Maianga</Text>
                        </View>

                    </View>
                </View>
            </View>
            
            <View style={styles.modalbuttonaction}>
                <Button onPress={openTravellerModal} isPrimary isLoading text="Solicitar Reserva" />
            </View>

            <Modal
                height={600}
                maxHeight={600}
                ref={travellerModelRef}
                component={
                    <View style={styles.modal}>
                        <TravellRequestInfoPendingToApprove travelinfo={{}} accept={() => {}}  decline={() => {}}/>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        padding: 20,
        paddingVertical: 40,
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
    }
})