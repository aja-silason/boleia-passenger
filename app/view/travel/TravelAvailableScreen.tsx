import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TravellerCard } from "../components/card/TravellerCard";
import { HeaderBack } from "../components/header/HeaderBack";

export default function TravelAvailableScreen(){
    const route = useRoute<RouteProp<RootStackParamList, "travelavailable">>()
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const travels = route.params.travels;

    return (
        <View style={styles.mainContent}>
            <HeaderBack isOtp={false} title={travels?.length + ` Boleia${travels.length > 1 ? 's' : ''} para ` + route.params.from}/>

            <FlatList
                data={travels}
                keyExtractor={(_, index) => index?.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => {}} style={styles.card} activeOpacity={0.9}>
                        <TravellerCard data={item} key={index} onPress={() => navigate.navigate("traveldetails", {travelDetails: item, historic: false})} />
                    </TouchableOpacity>
                )}

                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="car-outline" size={60} color={Colors.inactive} />
                        <Text style={styles.emptyTitle}>Nenhuma boleia encontrada</Text>
                        <Text style={styles.emptySubtitle}>
                            Tente mudar o horário ou o destino da sua busca.
                        </Text>
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
        paddingVertical: 60,
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
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
        marginTop: 15,
    },
    emptySubtitle: {
        fontSize: 14,
        color: Colors.placeholderText,
        textAlign: "center",
        marginTop: 8,
    }
})