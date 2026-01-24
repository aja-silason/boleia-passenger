import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { TravellerCard } from "./components/card/TravellerCard";

export default function TravelsScreen() {
    
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const travels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <View style={styles.mainContent}>
            <Text style={styles.title}>Minhas Viagens</Text>

            <FlatList
                data={travels}
                keyExtractor={(_, index) => index?.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => (
                    <TouchableOpacity onPress={() => navigate.navigate("traveldetails", {travelDetails: item.toString(), historic: true})} style={styles.card} activeOpacity={.6}>
                        <TravellerCard key={index} />
                    </TouchableOpacity>
                )}

                ListEmptyComponent={() => (
                    <Text>Sem viagem</Text>
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
        gap: 20,
        backgroundColor: "#fff",
        flex: 1
    },
    wrap: {
        flexWrap: "wrap"
    },
    title: {
        fontWeight: "600",
        fontSize: 16
    },
    list: {
        width: "100%",
    },
    card: {
        gap: 10,
        marginVertical: 10
    }
})