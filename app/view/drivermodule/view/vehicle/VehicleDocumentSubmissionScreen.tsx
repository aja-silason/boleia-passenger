import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DocumentItem } from "../../infra/hooks/useSubmetDocuments";
import { useVehicleSubmetDocuments } from "../../infra/hooks/vehicle/useVehicleSubmetDocuments";
import { Button } from "../components/button/Button";

export default function VehicleDocumentSubmissionScreen() {
    const {handlePickImage, handleSubmitAll, isSubmitting, documents} = useVehicleSubmetDocuments();
    const navigate = useNavigation();


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#212529" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verificação de Conta</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.infoBox}>
                    <Ionicons name="camera-outline" size={40} color={Colors.primary} />
                    <Text style={styles.infoTitle}>Fotografe o seu veículo</Text>
                    <Text style={styles.infoSubtitle}>
                        Para ativar habilitar o seu veículo, envie fotos nítidas das partes do veículo.
                    </Text>
                </View>

                {documents.map((doc: DocumentItem) => (
                    <View key={doc.id} style={styles.documentGroup}>
                        <Text style={styles.documentGroupName}>{doc.name}</Text>
                        
                        <View style={styles.rowSlots}>
                            <TouchableOpacity 
                                style={[styles.photoSlot, doc.front.uri && styles.photoSlotActive]} 
                                onPress={() => handlePickImage(doc.id, "front")}
                                activeOpacity={0.7}
                            >
                                {doc.front.uri ? (
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: doc.front.uri }} style={styles.previewImage} />
                                        <View style={styles.retakeBadge}>
                                            <Ionicons name="refresh" size={12} color="#fff" />
                                            <Text style={styles.retakeText}>Alterar</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.emptySlotContent}>
                                        <Ionicons name="add" size={24} color={Colors.primary} />
                                        <Text style={styles.slotLabel}>Frente</Text>
                                    </View>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={[styles.photoSlot, doc.back.uri && styles.photoSlotActive]} 
                                onPress={() => handlePickImage(doc.id, "back")}
                                activeOpacity={0.7}
                            >
                                {doc.back.uri ? (
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: doc.back.uri }} style={styles.previewImage} />
                                        <View style={styles.retakeBadge}>
                                            <Ionicons name="refresh" size={12} color="#fff" />
                                            <Text style={styles.retakeText}>Alterar</Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.emptySlotContent}>
                                        <Ionicons name="add" size={24} color={Colors.primary} />
                                        <Text style={styles.slotLabel}>Verso</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <Button 
                    text="Enviar Fotos para Análise"
                    isPrimary
                    isLoading={isSubmitting}
                    onPress={handleSubmitAll}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#E9ECEF"
    },
    backButton: {
        padding: 4
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#212529"
    },
    scrollContent: {
        padding: 20
    },
    infoBox: {
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#212529",
        marginTop: 12,
        marginBottom: 6
    },
    infoSubtitle: {
        fontSize: 13,
        color: "#6C757D",
        textAlign: "center",
        lineHeight: 18
    },
    documentGroup: {
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    documentGroupName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#495057",
        marginBottom: 12
    },
    rowSlots: {
        flexDirection: "row",
        gap: 12
    },
    photoSlot: {
        flex: 1,
        height: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CED4DA",
        borderStyle: "dashed",
        backgroundColor: "#F8F9FA",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden"
    },
    photoSlotActive: {
        borderStyle: "solid",
        borderColor: "#4DAC27"
    },
    emptySlotContent: {
        alignItems: "center",
        justifyContent: "center"
    },
    slotLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#6C757D",
        marginTop: 4
    },
    imageContainer: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    retakeBadge: {
        position: "absolute",
        bottom: 6,
        right: 6,
        backgroundColor: "rgba(0,0,0,0.65)",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
        gap: 4
    },
    retakeText: {
        color: "#fff",
        fontSize: 9,
        fontWeight: "600"
    },
    footer: {
        padding: 20,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#E9ECEF"
    }
});