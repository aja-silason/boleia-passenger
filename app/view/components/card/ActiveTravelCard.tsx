import { TravelOutput } from "@/app/infra/service/travel/TravelOutput";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ActiveTravelCardProps {
    data: TravelOutput | undefined;
    onPress: () => void;
}

export const ActiveTravelCard = ({ data, onPress }: ActiveTravelCardProps) => {
    const statusLabel = "Viagem em curso"; 

    return (
        <TouchableOpacity 
            activeOpacity={0.85} 
            onPress={onPress} 
            style={styles.container}
        >
            <View style={styles.badge}>
                <View style={styles.dot} />
                <Text style={styles.badgeText}>{statusLabel?.toUpperCase()}</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.routeContainer}>
                    <View style={styles.iconColumn}>
                        <Ionicons name="radio-button-on" size={16} color={Colors.primary} />
                        <View style={styles.line} />
                        <Ionicons name="location" size={16} color="red" />
                    </View>
                    
                    <View style={styles.textColumn}>
                        <Text style={styles.locationText} numberOfLines={1}>{data?.origin || 'Origem'}</Text>
                        <Text style={styles.locationText} numberOfLines={1}>{data?.destiny || 'Destino'}</Text>
                    </View>
                </View>

                <View style={styles.actionArea}>
                    <View style={styles.avatarMini}>
                         <Ionicons name="car" size={20} color={Colors.primary} />
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                </View>
            </View>

            <Text style={styles.tapPrompt}>Toque para ver detalhes e acompanhar</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#f0f0f0"
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginRight: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: Colors.blackText,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    routeContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    iconColumn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    line: {
        width: 1,
        height: 15,
        backgroundColor: Colors.placeholderText,
        marginVertical: 2,
    },
    textColumn: {
        justifyContent: 'space-between',
        height: 45,
    },
    locationText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    actionArea: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatarMini: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapPrompt: {
        marginTop: 12,
        fontSize: 11,
        color: Colors.placeholderText,
        textAlign: 'center',
        fontStyle: 'italic',
        borderTopWidth: 1,
        borderTopColor: Colors.inactive,
        paddingTop: 8,
    }
});