import { Colors } from "@/constants/theme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { BehaviorButton } from "../button/BehaviorButton";
import { Button } from "../button/Button";

type props = {
    travelinfo: any,
    accept: VoidFunction;
    decline: VoidFunction;
}

export const TravellRequestInfoApproved = (props: props) => {
    return (
        <View style={styles.mainContent}>
            <View>

                <View style={{justifyContent: "center", alignItems: "center", marginVertical: 20}}>
                    <MaterialIcons name="check-circle" size={40} color={Colors.success} style={{backgroundColor: Colors.placeHolder, borderRadius: 100, padding: 5}}/>
                    <Text style={styles.title}>Aguardando a Aprovação do Motorista</Text>
                </View>


                <View style={styles.requesttravel}>
                    <Text style={styles.title}>Resumo da sua Reserva</Text>

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

                    <View style={{borderBottomWidth: 1, marginVertical: 10, borderColor: Colors.placeHolder}}></View>

                    <View style={{flexDirection: "column"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{color: Colors.placeholderText}}>Lugares: </Text>
                            <Text style={{fontWeight: 600}}>2</Text>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Text style={{color: Colors.placeholderText}}>Preço Total: </Text>
                            <Text style={{fontWeight: 600}}>2.500,00kz</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.requesttravel, {backgroundColor: Colors.blueInc, borderColor: Colors.blueInc}]}>
                   <Text style={{fontWeight: 600, color: Colors.textBlueInc}}>O que acontece agora?</Text>
                   <Text style={{color: Colors.textBlueInc}}>A sua solicitação foi enviada ao motorista, dentro em breve receberá notificação sobre o estado da mesma.</Text>
                </View> 
            </View>
            
            <View style={[styles.modalbuttonaction, {flexDirection: "column"}]}>
                <BehaviorButton onPress={props.decline} isLoading isSuccess={false} text="Cancelar pedido" />
                <Button onPress={props.accept} isLoading isPrimary text="Ver detalhes do Pedido" />
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