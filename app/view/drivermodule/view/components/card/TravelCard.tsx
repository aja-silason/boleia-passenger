
import { Colors } from "@/constants/theme"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
import { TravelOutput } from "../../../infra/service/travel/TravelOutput"

type props = {
    data: TravelOutput
}

export const TravelCard = (props: props) => {
    const pendingCount = props.data?.pendingPassanger?.length || 0;
    
    const [dateInfo, fullHour] = props.data.dateToTravel.split('T');
    const hour = fullHour?.substring(0, 5) || '';

    return (
        <View style={styles.container}>
            {pendingCount > 0 && (
                <View style={styles.badge}>
                    <Ionicons name="notifications" size={10} color="#fff" />
                    <Text style={styles.badgeText}>
                        {pendingCount} {pendingCount === 1 ? 'solicitação' : 'solicitações'}
                    </Text>
                </View>
            )}

            <View style={styles.routeRow}>
                <View style={styles.pointContainer}>
                    <View style={[styles.dot, { backgroundColor: Colors.primary }]} />
                    <Text style={styles.locationTitle} numberOfLines={1}>{props?.data?.origin || '-'}</Text>
                </View>
                
                <Ionicons name="chevron-forward" size={14} color={Colors.placeHolder} style={{ marginHorizontal: 8 }} />

                <View style={styles.pointContainer}>
                    <View style={[styles.dot, { backgroundColor: '#E74C3C' }]} />
                    <Text style={styles.locationTitle} numberOfLines={1}>{props?.data?.destiny || '-'}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.timeBadge}>
                    <Ionicons name="time-outline" color={Colors.placeholderText} size={14}/>
                    <Text style={styles.footerText}>{dateInfo} • {hour}</Text>
                </View>
                
                <View style={styles.seatsInfo}>
                    <MaterialCommunityIcons 
                        name="account-group-outline" 
                        color={props.data?.availablePassangers?.length >= Number(props.data?.seats) ? '#E74C3C' : Colors.placeholderText} 
                        size={16}
                    />
                    <Text style={[
                        styles.footerText, 
                        { fontWeight: '700' }
                    ]}>
                        {props.data?.availablePassangers?.length}/{props?.data?.seats} ocupados
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 12,
        width: "100%",
        padding: 16,
        gap: 15,
        position: 'relative'
    },
    badge: {
        position: 'absolute',
        top: -12,
        right: 15,
        backgroundColor: '#FF3B30',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
        zIndex: 10,
        gap: 4
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    routeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pointContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flex: 1
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    locationTitle: {
        fontWeight: "700",
        fontSize: 15,
        color: '#2C3E50',
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: '#F8F8F8',
        paddingTop: 12
    },
    timeBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    seatsInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6
    },
    footerText: {
        color: Colors.placeholderText,
        fontSize: 12,
        fontWeight: '500'
    }
})