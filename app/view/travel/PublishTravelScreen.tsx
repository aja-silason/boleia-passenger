import { Colors } from "@/constants/theme";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";

export default function PublishTravelScreen() {

    const travelPublished = () => {
        Alert.alert(`Travel was published`);
    }

    return (
        <View style={styles.mainContent}>
            <HeaderBack title="Publique a sua BOLEIA"/>

            <View style={styles.userinfo}>
                <Input onChange={() => {}} placeholder="" title="Origem" type="telephoneNumber" isHalf/>
                <Input onChange={() => {}} placeholder="" title="Destino" type="telephoneNumber" isHalf/>
            </View>

            <View style={{paddingVertical: 10}}>
                <Text style={{fontWeight: "600", fontSize: 15}}>Detalhes da Viagem</Text>
            </View>
            
            <View style={styles.userinfo}>
                <Input onChange={() => {}} placeholder="" title="Data e Hora de Partida" type="telephoneNumber"/>
            </View>

            <View style={styles.userinfo}>
                <Input onChange={() => {}} placeholder="" title="Preço" type="telephoneNumber" isHalf/>
                <Input onChange={() => {}} placeholder="" title="Lugares disponíveis " type="telephoneNumber" isHalf/>
            </View>

            <View style={styles.userinfo}>
                <Input onChange={() => {}} placeholder="" title="Viatura a utilizar" type="telephoneNumber"/>
            </View>

            <View style={styles.modalbuttonaction}>
                <Button onPress={travelPublished} isPrimary isLoading text="Publicar corrida" />
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
        gap: 20,
        paddingVertical: 20
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
    },
    userinfo: {
        flexDirection: "row",
        justifyContent: "space-between"
     }
})