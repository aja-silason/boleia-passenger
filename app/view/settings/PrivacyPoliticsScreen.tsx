import { useGetPolitcs } from "@/app/infra/hooks/setting/useGetPolitcs";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import {
    BackHandler,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    View
} from "react-native";
import { HeaderBack } from "../components/header/HeaderBack";

export default function PrivacyPoliticsScreen() {

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

    const {data, handleFetch, isLoading} = useGetPolitcs();

    return (
        <View style={{ flex: 1, backgroundColor: Colors.whiteBackground }}>
            <View style={styles.container}>
            <HeaderBack />
                <View style={styles.header}>
                    <Text style={styles.title}>Politica de Privacidade</Text>
                </View>

                <FlatList
                    style={{height: "75%"}}
                    data={data}
                    keyExtractor={(item) => item?.order.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={styles.innerTitle}>{item?.title}</Text>
                            <Text style={styles.subtitle}>{item?.description}</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptylist}>
                            <Ionicons name="list-outline" size={50} color={Colors.placeHolder} />
                            <Text style={styles.emptytext}>Arraste para baixo para actualizar a tela.</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={isLoading} onRefresh={handleFetch} tintColor={Colors.primary} />
                    }
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 30,
    },
    header: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 10,
    },
    innerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: "#666",
        lineHeight: 22,
    },
    inputContainer: {
        backgroundColor: "#fff",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#F0F0F0",
        padding: 15,
        minHeight: 200,
        marginBottom: 25
    },
    textArea: {
        fontSize: 16,
        color: "#1A1A1A",
        height: "40%",
    },
    submitButton: {
        backgroundColor: Colors.primary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 16,
        gap: 10,
    },
    disabledButton: {
        backgroundColor: "#A0A0A0",
        opacity: 0.6,
    },
    submitText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    footerInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        gap: 5,
    },
    infoText: {
        fontSize: 13,
        color: Colors.placeholderText,
    },
    emptylist: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        gap: 10
    },
    emptytext: {
        color: Colors.placeHolder,
        textAlign: "center",
        fontSize: 14,
    }
});