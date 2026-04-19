import { TravelOutput } from "@/app/infra/service/travel/TravelOutput";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TravellerCardProps {
    data?: TravelOutput;
    onPress?: () => void;
}

export const TravellerCard = ({ data, onPress }: TravellerCardProps) => {


    const dateObj = data?.dateToTravel ? new Date(data.dateToTravel) : new Date();
    const formattedDate = dateObj.toLocaleDateString('pt-PT');
    const formattedTime = dateObj.toLocaleTimeString('pt-PT');


    return (
        <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={onPress} 
            style={styles.container}
        >
            <View style={styles.header}>
                <View style={styles.driverInfo}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={24} color={Colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.driverName}>{data?.origin} &rarr; {data?.destiny}</Text>
                        <View style={styles.ratingRow}>
                            <Ionicons name="star" size={14} color={Colors.orange} />
                            <Text style={styles.ratingText}>4.8</Text>
                            <Text style={styles.reviewsText}>(120 avaliações)</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.price}>{data?.price?.toLocaleString('pt-AO', { minimumFractionDigits: 2 })} Kz</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
                <View style={styles.infoBlock}>
                    <Ionicons name="map-outline" size={16} color={Colors.placeholderText} />
                    <Text style={styles.infoText}>{data?.origin} &rarr; {data?.destiny}</Text>
                </View>
            </View>

            <View style={styles.detailsRow}>
                <View style={styles.infoBlock}>
                    <Ionicons name="calendar-clear-outline" size={16} color={Colors.placeholderText} />
                    <Text style={styles.infoText}>{formattedDate}</Text>
                </View>
                <View style={[styles.infoBlock, { justifyContent: 'flex-end' }]}>
                    <Ionicons name="time-outline" size={16} color={Colors.placeholderText} />
                    <Text style={styles.infoText}>{formattedTime}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.vehicleTag}>
                    <Ionicons name="car-outline" size={14} color={Colors.placeholderText} />
                    <Text style={styles.footerText}>{data?.car?.brand || '-'} • {data?.car?.color || '-'}</Text>
                </View>
                
                <View style={[styles.seatsTag, { backgroundColor: Colors.inactive }]}>
                    <Text style={styles.seatsText}>{data?.availableSeats} Lugares vagos</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        // Sombra suave para destacar o card
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#F0F0F0'
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    driverInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    avatarContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: Colors.inactive,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary + '20' // 20% de opacidade
    },
    driverName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#333",
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },
    ratingText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#333",
    },
    reviewsText: {
        fontSize: 12,
        color: Colors.placeholderText,
    },
    price: {
        fontSize: 18,
        fontWeight: "800",
        color: Colors.primary,
    },
    divider: {
        height: 1,
        backgroundColor: "#F0F0F0",
        marginVertical: 14,
        borderStyle: "dashed", // Mantendo o estilo que você gostou, mas mais sutil
        borderRadius: 1,
    },
    detailsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    infoBlock: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        flex: 1,
    },
    infoText: {
        fontSize: 14,
        color: "#555",
        fontWeight: "500",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 8,
        borderRadius: 8,
    },
    vehicleTag: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    footerText: {
        fontSize: 12,
        color: "#666",
    },
    seatsTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    seatsText: {
        fontSize: 11,
        fontWeight: "700",
        color: Colors.placeholderText,
    }
});