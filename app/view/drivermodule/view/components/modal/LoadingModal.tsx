import { Colors } from "@/constants/theme";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

export const LoadingModal = ({ visible }: { visible: boolean }) => (
    <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.text}>Processando...</Text>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 10,
        alignItems: "center",
        gap: 15,
    },
    text: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    }
});