import { RootStackParamList } from "@/app/shared/route";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PendingDocumentationCard(){
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
    return (
        <TouchableOpacity 
            style={styles.warningCard} 
            onPress={() => navigate.navigate("documentSubmissionDriver")}
            activeOpacity={0.8}
        >
            <View style={styles.warningIconContainer}>
                <Ionicons name="document-text" size={22} color="#D9480F" />
            </View>
            <View style={styles.warningTextContainer}>
                <Text style={styles.warningTitle}>Documentação Pendente</Text>
                <Text style={styles.warningDescription}>
                    Toque aqui para enviar os seus documentos e ativar a sua conta de motorista.
                </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#D9480F" />
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    warningCard: {
        backgroundColor: "#FFF9DB",
        borderWidth: 1,
        borderColor: "#FFE066",
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
        gap: 12
    },
    warningIconContainer: {
        backgroundColor: "#FFF3BF",
        padding: 8,
        borderRadius: 8
    },
    warningTextContainer: {
        flex: 1
    },
    warningTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#D9480F",
        marginBottom: 2
    },
    warningDescription: {
        fontSize: 12,
        color: "#F59F00",
        fontWeight: "500",
        lineHeight: 16
    }
});