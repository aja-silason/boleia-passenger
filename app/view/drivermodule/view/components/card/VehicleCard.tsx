import { VehicleOutput } from "@/app/infra/service/vehicle/VehicleOutput";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons"; // Certifique-se de ter o expo-icons instalado
import React from "react";
import { StyleSheet, Text, View } from "react-native";


interface VehicleCardProps {
    data: VehicleOutput;
}

export const VehicleCard = ({data}: VehicleCardProps) => {

    const isActive = data.status.includes("AVAILABLE");

    return (
        <View style={[styles.container, isActive && styles.activeContainer]}>
            <View style={styles.contentHeader}>
                <View style={styles.vehicleInfo}>
                    <Text style={styles.modelText}>
                        {data.brand} {data.model} <Text style={styles.yearText}>({data.year})</Text>
                    </Text>
                    
                    <View style={styles.plateContainer}>
                        <Text style={styles.plateText}>{data.plate}</Text>
                    </View>
                </View>

                {isActive ? (
                    <View style={styles.statusBadgeActive}>
                        <Ionicons name="checkmark-circle" size={18} color="#fff" />
                        <Text style={styles.statusTextActive}>Ativo</Text>
                    </View>
                ) : (
                    <View style={styles.statusBadgeInactive}>
                         <Text style={styles.statusTextInactive}>Inativo</Text>
                    </View>
                )}
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsFooter}>
                <View style={styles.detailItem}>
                    <Ionicons name="color-palette-outline" size={16} color="#777" />
                    <Text style={styles.detailText}>{data.color}</Text>
                </View>
                <Ionicons name="car-outline" size={20} color="#bbb" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: "#f0f0f0",
    },
    activeContainer: {
        borderColor: Colors.blueInc,
        borderWidth: 1,
    },
    contentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    vehicleInfo: {
        flex: 1,
        gap: 6,
    },
    modelText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#333",
    },
    yearText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#888",
    },
    plateContainer: {
        backgroundColor: "#f0f0f0",
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4,
        alignSelf: "flex-start",
    },
    plateText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#555",
        textTransform: "uppercase", // Garante que a placa seja maiúscula
        letterSpacing: 1,
    },
    // Badges de Status
    statusBadgeActive: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#28a745", // Verde de sucesso
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16,
        gap: 4,
    },
    statusTextActive: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    statusBadgeInactive: {
        backgroundColor: "#f4f4f4",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 16,
    },
    statusTextInactive: {
        color: "#888",
        fontSize: 12,
        fontWeight: "500",
    },
    // Divisor
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 4,
    },
    // Rodapé de detalhes
    detailsFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 8,
    },
    detailItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    detailText: {
        fontSize: 14,
        color: "#777",
    },
});