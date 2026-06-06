import { BehaviorButton } from "@/app/view/components/button/BehaviorButton";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type Props = {
    price: number;
    name: string;
    origin: string;
    accept: () => void;
    decline: () => void;
    loadingAcceptButton: boolean;
    loadingRefuseButton: boolean;
}

export const TravelRequestInfo = ({ price, name, accept, decline, loadingAcceptButton, loadingRefuseButton }: Props) => {
    
    // Fallback para caso os dados demorem a carregar
    if (!name) return null;

    return (
        <View style={styles.container}>
            {/* Perfil do Passageiro */}
            <View style={styles.profileSection}>
                <View style={styles.avatarWrapper}>
                    <Ionicons name="person-circle" size={90} color="#E1E4E8" />
                    <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-sharp" size={12} color="#fff" />
                    </View>
                </View>
                
                <Text style={styles.name}>{name}</Text>
                
                <View style={styles.ratingRow}>
                    <Ionicons name="star" color="#F1C40F" size={16}/>
                    <Text style={styles.ratingText}>4.8</Text>
                    <Text style={styles.tripsText}> • 120 viagens</Text>
                </View>
            </View>

            {/* Detalhes do Pedido */}
            <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>RESUMO DO PEDIDO</Text>
                
                <View style={styles.infoRow}>
                    <View style={styles.labelGroup}>
                        <Ionicons name="people-outline" size={18} color={Colors.placeholderText} />
                        <Text style={styles.infoLabel}>Lugares Solicitados</Text>
                    </View>
                    <Text style={styles.infoValue}>1 lugar</Text> 
                </View>

                <View style={styles.separator} />

                <View style={styles.infoRow}>
                    <View style={styles.labelGroup}>
                        <Ionicons name="wallet-outline" size={18} color={Colors.placeholderText} />
                        <Text style={styles.infoLabel}>Total a Receber</Text>
                    </View>
                    <Text style={styles.totalValue}>{price} KZ</Text>
                </View>
            </View>

            <View style={styles.routeCard}>
                <View style={styles.routeItem}>
                    <Ionicons name="radio-button-on" size={14} color={Colors.primary} />
                    <Text style={styles.routeText}>Ponto de Encontro: <Text style={{fontWeight: '700'}}>{}</Text></Text>
                </View>
            </View>

            <View style={styles.actionFooter}>
                <BehaviorButton 
                    halfWidth 
                    onPress={accept} 
                    isLoading={loadingAcceptButton} 
                    isSuccess={true} 
                    text="Aceitar" 
                />
                <BehaviorButton
                    halfWidth 
                    onPress={decline} 
                    isLoading={loadingRefuseButton} 
                    isSuccess={false} 
                    text="Recusar" 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
    },
    profileSection: {
        alignItems: "center",
        paddingVertical: 20,
    },
    avatarWrapper: {
        position: 'relative',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 2,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2C3E50",
        marginTop: 5,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#2C3E50",
        marginLeft: 4,
    },
    tripsText: {
        fontSize: 14,
        color: Colors.placeholderText,
    },
    detailsCard: {
        backgroundColor: "#F8F9FA",
        borderRadius: 12,
        padding: 16,
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "800",
        color: Colors.placeholderText,
        letterSpacing: 1,
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    labelGroup: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: "#4F5E71",
    },
    infoValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2C3E50",
    },
    totalValue: {
        fontSize: 16,
        fontWeight: "800",
        color: Colors.primary,
    },
    separator: {
        height: 1,
        backgroundColor: "#EBEBEB",
        marginVertical: 12,
    },
    routeCard: {
        paddingHorizontal: 5,
        marginBottom: 20,
    },
    routeItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    routeText: {
        fontSize: 14,
        color: "#4F5E71",
    },
    actionFooter: {
        flexDirection: "row",
        gap: 12,
        marginTop: "auto",
        paddingTop: 10,
    },
});