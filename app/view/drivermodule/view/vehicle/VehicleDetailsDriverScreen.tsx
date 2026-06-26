import { VehicleOutput } from "@/app/infra/service/vehicle/VehicleOutput";
import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "../components/button/Button";

export default function VehicleDetailsDriverScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();

    useEffect(() => {
        const backAction = () => {
            if(navigation.canGoBack()) {
                navigation.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigation]);
    
    const { data } = route.params as { data: VehicleOutput };

    const isActive = data.status?.includes("AVAILABLE");

    const vehicle = {
        id: data.id,
        brand: data?.brand,
        model: data?.model,
        plate: data?.plate,
        color: data?.color,
        year: data?.year,
        category: "N/D",
        isActive: isActive
    };

    const handleDelete = () => {
        Alert.alert(
            "Excluir Veículo",
            "Tem certeza que deseja remover este veículo da sua lista?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: () => Alert.alert("Aviso", "Solicite deleção da conta ao nosso suporte") }
            ]
        );
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.hero}>
                <View style={styles.iconCircle}>
                    <Ionicons name="car" size={60} color={Colors.primary} />
                </View>
                <Text style={styles.modelTitle}>{vehicle.brand} {vehicle.model}</Text>
                <View style={styles.plateBadge}>
                    <Text style={styles.plateText}>{vehicle.plate}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Informações Gerais</Text>
                
                <View style={styles.infoCard}>
                    <DetailRow label="Cor" value={vehicle.color} icon="color-palette-outline" />
                    <DetailRow label="Ano" value={vehicle.year.toString()} icon="calendar-outline" />
                    <DetailRow label="Categoria" value={vehicle.category} icon="options-outline" />
                    <DetailRow 
                        label="Status" 
                        value={vehicle.isActive ? "Ativo para Viagens" : "Inativo"} 
                        icon="radio-button-on-outline"
                        valueColor={vehicle.isActive ? "#28a745" : "#dc3545"}
                    />
                </View>

                {/* Ações */}
                <View style={styles.actionsContainer}>
                    <Button isLoading={false} onPress={() => navigation.navigate("vehicleDocumentSubmissionDriver", {vehicleId: data.id})} text="Adicionar Imagem do veículo" icon={<Ionicons name="cloud-upload-outline" size={20} color={Colors.blackText} />}/>
                    <Button isLoading={false} onPress={() => navigation.navigate("editVehicle", {data: data})} text="Editar Veículo" icon={<Ionicons name="create-outline" size={20} color={Colors.blackText} />} isPrimary/>
                    
                    <TouchableOpacity 
                        style={styles.deleteButton} 
                        onPress={handleDelete}
                    >
                        <Ionicons name="trash-outline" size={20} color="#dc3545" />
                        <Text style={[styles.buttonText, { color: "#dc3545" }]}>Remover Veículo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const DetailRow = ({ label, value, icon, valueColor = "#333" }: any) => (
    <View style={styles.detailRow}>
        <View style={styles.labelGroup}>
            <Ionicons name={icon} size={20} color="#888" />
            <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    hero: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 40,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
    iconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.blackText,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    modelTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1a1a1a",
    },
    plateBadge: {
        marginTop: 10,
        backgroundColor: "#333",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 6,
    },
    plateText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 2,
    },
    content: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#888",
        textTransform: "uppercase",
        marginBottom: 15,
        marginLeft: 5,
    },
    infoCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        gap: 20,
        marginBottom: 30,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    labelGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    label: {
        fontSize: 15,
        color: "#666",
    },
    value: {
        fontSize: 15,
        fontWeight: "600",
    },
    actionsContainer: {
        gap: 12,
    },
    editButton: {
        backgroundColor: "#007BFF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        gap: 10,
    },
    deleteButton: {
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        gap: 10,
        borderWidth: 1,
        borderColor: "#ffcccc",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});