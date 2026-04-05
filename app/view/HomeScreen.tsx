import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSearchTravel } from "../infra/hooks/travel/useSearchTravel";
import { useAuthContext } from "../shared/context/auth.context";
import { Button } from "./components/button/Button";
import { ButtonInLine } from "./components/button/ButtonInLine";
import { Header } from "./components/header/Header";
import { InputInLine } from "./components/input/InputInLine";


export default function HomeScreen() {
    const {userInformation} = useAuthContext();

    const { handleChange, isLoading, handleSubmit} = useSearchTravel()

    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === "ios");
        setDate(currentDate);
        handleChange("startTime", currentDate?.toISOString())
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Header title="Encontre sua próxima" username={`Olá, ${userInformation?.firstName+' '+userInformation?.lastName}`} />
                
                <View style={styles.welcomeSection}>
                    <Text style={styles.subtitle}>
                        Para onde vamos hoje? Encontre motoristas no seu trajeto.
                    </Text>
                </View>

                <View style={styles.searchCard}>
                    <InputInLine 
                        onChange={(value) => handleChange("origin", value)} 
                        placeholder="De onde vai sair?" 
                        icon={<Ionicons name="radio-button-on" size={20} color="green"/>}
                    />
                    <View style={styles.divider} />

                    <InputInLine 
                        onChange={(value) => handleChange("location", value)} 
                        placeholder="Para onde vamos?" 
                        icon={<Ionicons name="location" size={20} color="red"/>} 
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1.5 }}>
                            <ButtonInLine 
                                onPress={() => setShowCalendar(true)} 
                                title={date?.toLocaleDateString('pt-BR')}
                                icon={<Ionicons name="calendar-outline" size={20} color={Colors.primary}/>}
                            />
                        </View>
                        
                        <View style={{ flex: 1 }}>
                            <InputInLine 
                                onChange={(value) => handleChange("seats", value)} 
                                placeholder="1" 
                                keyBoardType="number-pad"
                                icon={<Ionicons name="person-outline" size={20} color={Colors.placeHolder}/>} 
                            />
                        </View>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <Button 
                            onPress={handleSubmit}
                            isLoading={isLoading} 
                            text="Procurar Boleia" 
                            isPrimary 
                        />
                    </View>
                </View>

                {showCalendar && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        is24Hour={true}
                        display={Platform.OS === 'ios' ? 'inline' : 'default'}
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 40
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    welcomeSection: {
        marginTop: 10,
        marginBottom: 25,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
    },
    searchCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        gap: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        borderWidth: 1,
        borderColor: "#f0f0f0"
    },
    row: {
        flexDirection: "row",
        gap: 12,
        alignItems: 'center'
    },
    divider: {
        height: 1,
        backgroundColor: "#f0f0f0",
        marginHorizontal: 10,
    },
    buttonWrapper: {
        marginTop: 10,
    }
});