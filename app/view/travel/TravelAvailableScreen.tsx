import { RootStackParamList } from "@/app/shared/route";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TravellerCard } from "../components/card/TravellerCard";
import { HeaderBack } from "../components/header/HeaderBack";

export default function TravelAvailableScreen(){
    
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const route = useRoute<RouteProp<RootStackParamList, "travelavailable">>()
    const param = route.params.query;

    const request = [0, 1, 2]

    return (
        <View style={styles.mainContent}>
            <HeaderBack isOtp={false} title={request?.length + ` Boleia${request.length > 1 ? 's' : ''} para ` + param?.from}/>

            <FlatList
                data={request}
                keyExtractor={(_, index) => index?.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => navigate.navigate("traveldetails", {travelDetails: param, historic: false})} style={styles.card} activeOpacity={.6}>
                        <TravellerCard key={index} />
                    </TouchableOpacity>
                )}

                ListEmptyComponent={() => (
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Text>Sem Pedido Pendetes</Text>
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
    subtitle: {
        fontWeight: '600'
    },
    wrap: {
        flexWrap: "wrap"
    },
    
    list: {
        width: "100%",
    },
    card: {
        gap: 10,
        marginVertical: 10
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