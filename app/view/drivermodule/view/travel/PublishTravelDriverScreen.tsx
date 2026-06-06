import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";

import { useGetAllVehicles } from "@/app/infra/hooks/vehicle/useGetAllVehicles";
import { RootStackParamList } from "@/app/shared/route";

import { useCreateTravel } from "../../infra/hooks/travel/useCreateTravel";
import { Button } from "../components/button/Button";
import { HeaderBack } from "../components/header/HeaderBack";
import { Input } from "../components/input/Input";
import { InputDate } from "../components/input/InputDate";
import { InputVehicle } from "../components/input/InputVehicle";
import { Modal } from "../components/modal/Modal";

export default function PublishTravelDriverScreen() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const modalizeRef = useRef<Modalize>(null);

    const { 
        handleChange, handleSubmit, selectedVehicleId, isSuccess, 
        isLoading: loading, setSelectedVehicleId, onDateSelected, 
        displayDate, data: travelInformation
    } = useCreateTravel();

    const { data, handleFetch } = useGetAllVehicles();

    const activeVehicles = useMemo(() => {
        return data?.filter(v => v.status === "AVAILABLE") ?? [];
    }, [data]);


    useEffect(() => {
        if (isSuccess) {
            modalizeRef.current?.open();
        }
    }, [isSuccess]);

    useEffect(() => {
        handleFetch();
        
        const backAction = () => {
            if (navigate.canGoBack()) {
                navigate.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [navigate, handleFetch]);

    const onScrollBeginDrag = useCallback(() => Keyboard.dismiss(), []);

    return (
        <GestureHandlerRootView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView 
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        onScrollBeginDrag={onScrollBeginDrag}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.mainContent}>
                            <HeaderBack title="Publique a sua BOLEIA"/>

                            <View style={styles.row}>
                                <Input 
                                    onChange={(v) => handleChange("origin", v)} 
                                    title="Origem" 
                                    placeholder="Ex: Luanda"
                                    isHalf 
                                />
                                <Input 
                                    onChange={(v) => handleChange("destiny", v)} 
                                    title="Destino" 
                                    placeholder="Ex: Benguela"
                                    isHalf 
                                />
                            </View>

                            <Text style={styles.sectionTitle}>Detalhes da Viagem</Text>
                            
                            <View style={styles.row}>
                                <InputDate 
                                    title="Data e Hora de Partida" 
                                    value={displayDate} 
                                    onDateChange={onDateSelected}
                                />
                            </View>

                            <View style={styles.row}>
                                <Input 
                                    onChange={(v) => handleChange("price", v)} 
                                    title="Preço (Kz)" 
                                    keyboardType="numeric"
                                    placeholder=""
                                    isHalf 
                                />
                                <Input 
                                    onChange={(v) => handleChange("seats", v)} 
                                    title="Lugares" 
                                    keyboardType="numeric"
                                    placeholder="1"
                                    value={travelInformation?.seats}
                                    isHalf 
                                />
                            </View>

                            <View style={styles.row}>
                                <InputVehicle 
                                    vehicles={activeVehicles}
                                    selectedVehicleId={selectedVehicleId}
                                    setSelectedVehicleId={setSelectedVehicleId}
                                />
                            </View>

                            <View style={styles.actionArea}>
                                <Button 
                                    onPress={handleSubmit} 
                                    isPrimary 
                                    isLoading={loading} 
                                    text="Publicar corrida" 
                                />
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>

                <Modal height={280} ref={modalizeRef} component={
                    <View style={styles.modalContent}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="checkmark-circle" color="#22C55E" size={70} />
                        </View>
                        <Text style={styles.modalTitleText}>Viagem Publicada!</Text>
                        <Text style={styles.modalDescription}>Sua boleia já está visível para os passageiros.</Text>
                        <Button 
                            onPress={() => navigate.navigate("tabsDriver")} 
                            text="Voltar ao Início" 
                            isPrimary
                        />
                    </View>
                }/>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollView: { flex: 1, backgroundColor: "#fff" },
    scrollContent: { paddingBottom: 40 },
    mainContent: {
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 20 : 40,
        flex: 1
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        gap: 10
    },
    sectionTitle: {
        fontWeight: "700",
        fontSize: 16,
        color: "#1F2937",
        marginTop: 10,
        marginBottom: 15
    },
    actionArea: {
        marginTop: 20,
        width: '100%'
    },
    modalContent: {
        alignItems: "center",
        padding: 20,
        gap: 15
    },
    iconContainer: {
        marginBottom: 10
    },
    modalTitleText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#111827"
    },
    modalDescription: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 10
    }
});