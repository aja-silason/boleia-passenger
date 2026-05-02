import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useGetAllTravel } from "../infra/hooks/travel/useGetAllTravel";
import { RootStackParamList } from "../shared/route";
import { TravellerCard } from "./components/card/TravellerCard";

export default function TravelsScreen() {
    
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
    
    const {data, handleFetch, isLoading} = useGetAllTravel();

    return (
        <View style={styles.mainContent}>
            <Text style={styles.title}>Minhas Viagens</Text>

            <FlatList
                data={data}
                keyExtractor={(_, index) => index?.toString()}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => (<TravellerCard key={index} data={item} onPress={() => navigate.navigate("traveldetails", {travelDetails: item, historic: true})}/>)}

                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons 
                            name={"archive-outline"} 
                            size={60} 
                            color="#CCC" 
                        />
                        <Text style={styles.emptyText}>Seu histórico de viagens concluídas está vazio</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                onRefresh={handleFetch}
                refreshing={isLoading}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleFetch}/>}
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
    },
    emptyContainer: {
        marginTop: 80,
        alignItems: "center",
        paddingHorizontal: 40,
    },
    emptyText: {
        color: "#ADB5BD",
        textAlign: "center",
        fontSize: 16,
        marginTop: 15,
        lineHeight: 22
    }
})