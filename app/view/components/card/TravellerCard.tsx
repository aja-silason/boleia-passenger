import { Colors } from "@/constants/theme"
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"

export const TravellerCard = () => {
    return(
        <View style={styles.container}>

            <View style={[styles.row, styles.travellercard]}>
                <View style={styles.travellerinfo}>
                    <Ionicons name="person-circle-outline" size={25} color={Colors.placeholderText}/>
                    <Text style={styles.title}>Maria da Piedade</Text>
                </View>

                <Text style={styles.title}>2.500 kz</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.title}>Maianga</Text>
                <Ionicons name="arrow-forward" size={13} color={Colors.placeholderText}/>
                <Text style={styles.title}>Kilamba</Text>
            </View>

            <View style={styles.calendar}>
                <Ionicons name="calendar-outline" color={Colors.placeholderText} size={14}/>
                <Text style={styles.calendarText}>Sábado, 03/03/2026</Text>
                <Text style={styles.calendarText}>*</Text>
                <Text style={styles.calendarText}>08:05</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: Colors.placeHolder,
        borderRadius: 5,
        width: "100%",
        padding: 10,
        gap: 10,
        flexWrap: "wrap"
    },
    title: {
        fontWeight: "600",
        fontSize: 15
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    calendar: {
        backgroundColor: Colors.inactive,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    calendarText: {
        color: Colors.placeholderText
    },
    bottonInfo: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap"
    },
    travellercard: {
        borderBottomWidth: 1,
        borderStyle: "dashed",
        borderColor: Colors.placeHolder,
        paddingBottom: 15
    },
    travellerinfo: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center"
    }
})