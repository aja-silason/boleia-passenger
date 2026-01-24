import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Alert, StyleSheet, Text, View } from "react-native";
import { BlueButton } from "../components/button/BlueButton";
import { HeaderBack } from "../components/header/HeaderBack";

type traveller = {
    name: string
}

export default function TravelDetailsScreen(){

    // const route = useRoute<RouteProp<RootStackParamList, "traveldetails">>()

    // const details = route.params;

    const startTravel = (id: string) => {
        Alert.alert(`Travel ${id} was started`);
    }

    const travel: traveller[] = [{name: "Anania"}, {name: "Adão"}, {name: "Madalena"}]

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Detalhes da Boleia"/>
            <View>
                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="speedometer-outline" size={15}/>
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
                    {/* {
                        travel?.map((item, index) => (
                        <View style={styles.bottomInfo} key={index}>
                            <Text style={styles.detailsInfoTitle}>Passageiro {index + 1}:</Text>
                            <Text style={styles.detailsInfoValue}>{item.name}</Text>
                        </View>
                        ))
                    } */}

                </View>

                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="car-outline" size={20}/>
                        <Text style={styles.title}>Detalhes da Viatura</Text>
                    </View>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Lugares Solicitados:</Text>
                        <Text style={styles.detailsInfoValue}>{travel.length}</Text>
                    </View>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Preço da Viagem:</Text>
                        <Text style={styles.detailsInfoValue}>2000 kz</Text>
                    </View>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Preço Total:</Text>
                        <Text style={styles.detailsInfoValue}>{travel.length * 2_000} kz</Text>
                    </View>
                </View> 

                <View style={styles.requesttravel}>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 5}}>
                        <Ionicons name="car-outline" size={20}/>
                        <Text style={styles.title}>Preço e Disponibilidade</Text>
                    </View>

                    <View style={styles.travelduration}>
                        <Text style={styles.datetravel}>03/01/2026</Text>
                        <Text style={styles.datetravel}>04/01/2026</Text>
                    </View>

                    <View style={styles.travelduration}>
                        <Text style={styles.time}>22h:53</Text>
                        <Ionicons name="car-sharp" size={20} color={Colors.placeHolder} />
                        <Text style={styles.time}>00h:03</Text>
                    </View>

                    <View style={styles.bottomInfo}>
                        <Text style={styles.bottonTravelText}>Talatona</Text>
                        <Text style={styles.bottomContentTime}>1h:10</Text>
                        <Text style={styles.bottonTravelText}>Maianga</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.modalbuttonaction}>
                <BlueButton onPress={() => startTravel("34567-dfghj-567890")} isBlue isLoading text="Iniciar corrida" />
            </View>
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
    }
})