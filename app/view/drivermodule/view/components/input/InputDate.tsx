import { Colors } from "@/constants/theme";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    title: string;
    value: string;
    onDateChange: (date: Date) => void;
};

export const InputDate = ({ title, value, onDateChange }: Props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState<'date' | 'time'>('date');
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);

        if (event.type === 'dismissed') {
            setMode('date');
            return;
        }

        const currentDate = selectedDate || date;
        setDate(currentDate);

        if (Platform.OS === 'android') {
            if (mode === 'date') {
                setTimeout(() => {
                    setMode('time');
                    setShow(true);
                }, 100); 
            } else {
                onDateChange(currentDate);
                setMode('date');
            }
        } else {
            onDateChange(currentDate);
        }
    };

    const handleOpen = () => {
        setMode('date');
        setShow(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{title}</Text>
            <Pressable style={styles.inputBox} onPress={handleOpen}>
                <Text style={{ color: value ? "#000" : Colors.placeHolder }}>
                    {value || "Toque para definir data e hora"}
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onChange}
                    minimumDate={new Date()}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, marginBottom: 15 },
    label: { fontSize: 14, color: Colors.background, marginBottom: 8, fontWeight: "600" },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.placeHolder,
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9"
    }
});