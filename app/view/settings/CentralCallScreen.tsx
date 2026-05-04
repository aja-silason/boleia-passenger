import { useGetSystemInformation } from "@/app/infra/hooks/setting/useGetSystemInformation";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import { HeaderBack } from "../components/header/HeaderBack";

export default function CentrallCallScreen(){

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

    const {data, handleFetch, isLoading} = useGetSystemInformation();
    
        return (
            <View style={{ flex: 1, backgroundColor: Colors.whiteBackground }}>
                <ScrollView 
                    style={styles.container}
                    refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleFetch} />}
                >
                    <HeaderBack />
                    <View style={styles.header}>
                        <Text style={styles.title}>Central de Apoio</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>Número de Telefone da Central</Text>
                        <Text style={styles.infoValue}>{data?.centralPhoneNumber}</Text>
                    </View>
                </ScrollView>
            </View>
        );
}

const styles = StyleSheet.create({
    infoBox: { backgroundColor: "#F8F9FA", padding: 15, borderRadius: 10, borderWidth: 1, borderColor: "#EEE", marginBottom: 10 },
    infoTitle: { fontSize: 12, color: Colors.placeholderText, marginBottom: 5 },
    infoValue: { fontSize: 15, fontWeight: "600", color: "#333" },
    container: {
        padding: 20,
        paddingTop: 60,
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