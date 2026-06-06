import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type props = {
    action: VoidFunction;
    title: string
}

export const AddButton = (props: props) => {
    return (
        <TouchableOpacity 
            style={styles.addButton} 
            onPress={props.action}
            activeOpacity={0.8}
        >
            <Ionicons name="add-circle" size={24} color={Colors.blackText} />
            <Text style={styles.addButtonText}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: Colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    addButtonText: {
        color: Colors.blackText,
        fontWeight: "600",
        fontSize: 14
    },
});