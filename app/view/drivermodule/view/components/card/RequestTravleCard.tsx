
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type props = {
    traveler: number;
}

export const RequestTravelCard = (props: props) => {
    return (
        <View
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.head}>
                    <View style={styles.iconBadge}>
                        <Ionicons name="notifications" size={16} color={Colors.orange}/>
                    </View>
                    <Text style={styles.title}>Solicitações Pendentes</Text>
                </View>
                
                <View style={styles.body}>
                    <View style={styles.infoGroup}>
                        <Text style={styles.label}>Passageiros aguardando</Text>
                        <Text style={styles.countText}>
                            {props.traveler || 0} {props.traveler === 1 ? 'pessoa' : 'pessoas'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF8F2",
        borderLeftWidth: 6,
        borderColor: Colors.orange,
        borderRadius: 12,
        shadowColor: Colors.orange,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 5,
    },
    content: {
        padding: 16,
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    iconBadge: {
        backgroundColor: "#FFEBD9",
        padding: 6,
        borderRadius: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
        color: Colors.blueInc,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    body: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    infoGroup: {
        gap: 2,
    },
    label: {
        fontSize: 13,
        color: "#A16207",
        fontWeight: "500",
    },
    countText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#451A03",
    },
    actionIcon: {
        backgroundColor: "#FFF",
        padding: 8,
        borderRadius: 20,
    }
})