import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type props = {
    name: string;
    destiny: string;
    origin: string;
    amount: number;
    status: string
}

export const TravellerCard = ({ amount, destiny, name, origin, status }: props) => {
    return (
        <View style={styles.container}>
            <View style={styles.travellerHeader}>
                <View style={styles.travellerinfo}>
                    <View style={styles.avatarCircle}>
                        <Ionicons name="person" size={20} color={Colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.nameLabel}>Passageiro</Text>
                        <Text style={styles.title}>{name}</Text>
                    </View>
                </View>

                <View style={styles.priceTag}>
                    <Text style={styles.priceText}>{amount} kz</Text>
                </View>
            </View>

            <View style={styles.routeRow}>
                <View style={styles.pointContainer}>
                    <Ionicons name="location-sharp" size={16} color="#E74C3C" />
                    <Text style={styles.locationText}>{origin}</Text>
                </View>
                
                <Ionicons name="ellipsis-horizontal" size={15} color={Colors.placeHolder} style={{ marginHorizontal: 10 }} />

                <View style={styles.pointContainer}>
                    <Ionicons name="navigate-circle" size={16} color="#2ECC71" />
                    <Text style={styles.locationText}>{destiny}</Text>
                </View>
            </View>

            {/* Footer: Data e Hora */}
            <View style={styles.footer}>
                <View style={styles.calendarBadge}>
                    {/* <Ionicons name="time-outline" color={Colors.placeholderText} size={14}/>
                    <Text style={styles.calendarText}>Sábado, 03/03/2026 • 08:05</Text> */}
                </View>
                
                <Text style={styles.statusText}>{status === 'PENDING' ? 'Pendente' : status === 'ACCEPTED' ? 'Aprovada' : 'Rejeitada' }</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        borderRadius: 12,
        width: "100%",
        padding: 15,
        gap: 12
    },
    travellerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: "#F0F0F0",
        paddingBottom: 12,
    },
    travellerinfo: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
    },
    avatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F4F7FF", // Cor leve baseada no primário
        justifyContent: "center",
        alignItems: "center",
    },
    nameLabel: {
        fontSize: 10,
        color: Colors.placeholderText,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    title: {
        fontWeight: "700",
        fontSize: 16,
        color: "#2C3E50",
    },
    priceTag: {
        backgroundColor: "#E8F5E9", // Verde leve para dinheiro
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    priceText: {
        color: "#2E7D32", // Verde escuro
        fontWeight: "800",
        fontSize: 14,
    },
    routeRow: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F9F9",
        padding: 10,
        borderRadius: 8,
    },
    pointContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        flex: 1,
    },
    locationText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#555",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    calendarBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    calendarText: {
        fontSize: 12,
        color: Colors.placeholderText,
        fontWeight: "500",
    },
    statusText: {
        fontSize: 11,
        fontWeight: "700",
        color: "#F39C12", // Laranja para pendente
        textTransform: "uppercase",
    }
});