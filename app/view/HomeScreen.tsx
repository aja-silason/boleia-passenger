import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../shared/route";
import { Button } from "./components/button/Button";
import { ButtonInLine } from "./components/button/ButtonInLine";
import { Header } from "./components/header/Header";
import { InputInLine } from "./components/input/InputInLine";

export default function HomeScreen() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [date, setDate] = useState<any>(new Date());
    const [showCalendar, setShowCalendar] = useState<boolean>(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowCalendar(Platform.OS === "ios");
        setDate(currentDate);
    }
    
    const showMode = () => setShowCalendar(true);

    return (
        <View style={styles.mainContent}>
            <Header title="Bem vindo ao seu painel de Boleia" username={"Olá Anania Augusto"}/>
            
            <Text>Encontra motoristas a caminho do teu destino.</Text>

            <View style={styles.moreandcard}>
                <InputInLine onChange={() => {}} placeholder="De onde vai sair?" title="" icon={<Ionicons name="search-outline" size={20} color={Colors.placeHolder}/>}/>
                <InputInLine onChange={() => {}} placeholder="Para onde vamos?" title="" icon={<Ionicons name="location-outline" size={20} color={Colors.placeHolder}/>} />
                <View style={{flexDirection: "row", gap: 10}}>
                    <ButtonInLine onPress={showMode} placeholder="Hoje" title="Hoje" isHalf icon={<Ionicons name="calendar-outline" size={20} color={Colors.placeHolder}/>}/>
                    <InputInLine onChange={() => {}} placeholder="1" title="" isHalf icon={<Ionicons name="person-outline" size={20} color={Colors.placeHolder}/>} type="telephoneNumber"/>
                </View>

            </View>

            <Button isLoading onPress={()=> navigate.navigate("publishtravel")} text="Procurar Boleia" isPrimary />

            {showCalendar && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "#fff",
        flex: 1
    },
    title: {
        fontWeight: "600",
        fontSize: 14,
        paddingBottom: 10  
    },
    wrap: {
        flexWrap: "wrap"
    },
    moreandcard:{
        paddingVertical: 20,
        gap: 15
    },
     list: {
        width: "100%",
    },
    card: {
        gap: 10,
        marginVertical: 10
    },
    emptylist: {
        alignItems: "center",
        justifyContent: "center",
        height: 100
    },
    emptytext: {
        color: Colors.placeHolder
    }
})