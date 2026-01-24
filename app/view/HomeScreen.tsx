import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { RequestTravelCard } from "./components/card/RequestTravleCard";
import { TravelCard } from "./components/card/TravelCard";
import { Header } from "./components/header/Header";

export default function HomeScreen() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const travels = [0,1,2,3]
    
    return (
        <View style={styles.mainContent}>
            <Header title="Bem vindo ao seu painel de motorista" username={"Olá Anania Augusto"}/>
            
            <View style={styles.moreandcard}>
                <Button isLoading onPress={()=> navigate.navigate("publishtravel")} text="Publicar nova Boleia" isPrimary icon={<Ionicons name="add-circle-outline" size={20}/>} />
                <RequestTravelCard traveler={2} onPress={() => navigate.navigate("travelRequest", {travelId: '1232-12321'})} />
            </View>

            <Text style={styles.title}>Recentes Boleias</Text>

            <FlatList
                data={travels}
                keyExtractor={(_, index) => index?.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => navigate.navigate("travelRequest", {travelId: item.toString()})} style={styles.card} activeOpacity={.6}>
                        <TravelCard key={index} />
                    </TouchableOpacity>
                )}

                ListEmptyComponent={() => (
                    <View style={styles.emptylist}>
                        <Text style={styles.emptytext}>Ainda não há viagens em andamento.</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                style={styles.list}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "#fff",
        flex: 1
    },
    title: {
        fontWeight: "600",
        fontSize: 14,
        paddingBottom: 10  
    },
    wrap: {
        flexWrap: "wrap"
    },
    moreandcard:{
        paddingVertical: 20,
        gap: 15
    },
     list: {
        width: "100%",
    },
    card: {
        gap: 10,
        marginVertical: 10
    },
    emptylist: {
        alignItems: "center",
        justifyContent: "center",
        height: 100
    },
    emptytext: {
        color: Colors.placeHolder
    }
})