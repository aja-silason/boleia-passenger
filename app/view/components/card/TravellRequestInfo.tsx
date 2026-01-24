import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { BehaviorButton } from "../button/BehaviorButton";

type props = {
    travelinfo: any,
    accept: VoidFunction;
    decline: VoidFunction;
}

export const TravelRequestInfo = (props: props) => {
    return (
        <View style={styles.mainContent}>
            <View>
                <View style={styles.info}>
                    <Ionicons name="person-circle-outline" size={80} color={Colors.placeHolder} />
                    <Text style={styles.name}>Sofia Mendes</Text>
                    <View style={styles.evaluation}>
                        <Text style={styles.evaluationtext}>4.8</Text>
                        <Ionicons name="star" color={Colors.primary} size={12}/>
                        <Text style={styles.evaluationtext}>(120) positivas - </Text>
                        <Text style={styles.evaluationtext}>(1) negativas</Text>
                    </View>
                </View>

                <Text style={styles.title}>Detalhes da Viagem</Text>

                <View style={styles.requesttravel}>
                    <Text style={styles.title}>Detalhes do Pedido</Text>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Lugares Solicitados:</Text>
                        <Text style={styles.detailsInfoValue}>2</Text>
                    </View>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Preço da Viagem:</Text>
                        <Text style={styles.detailsInfoValue}>2.000,00 kz</Text>
                    </View>
                    <View style={styles.bottomInfo}>
                        <Text style={styles.detailsInfoTitle}>Preço Total:</Text>
                        <Text style={styles.detailsInfoValue}>4.000,00 kz</Text>
                    </View>
                </View> 

                <View style={styles.requesttravel}>
                    <Text style={styles.title}>Viagem solicitada</Text>

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
                <BehaviorButton halfWidth onPress={props.accept} isLoading isSuccess text="Aceitar Reserva" />
                <BehaviorButton halfWidth onPress={props.decline} isLoading isSuccess={false} text="Recusar" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        justifyContent: "flex-end"
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
        borderColor: Colors.placeHolder,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        borderRadius: 5,
        gap: 5,
        backgroundColor: Colors.cardBackground
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