import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
    onPressNumber: (num: string) => void;
    onDelete: VoidFunction;
    onClear: VoidFunction;
}

export const NumericKeyBoard = (props: props) => {

    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    return (
        <View style={styles.content}>

            {[0,3,6].map((startIndex) => (
                <View key={startIndex} style={styles.line}>
                    {
                        keys.slice(startIndex, startIndex + 3).map((num) => (
                            <TouchableOpacity style={styles.button} key={num} onPress={() => props.onPressNumber(num)}>
                                <Text style={styles.text}>{num}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            ))
            }

            <View style={styles.line}>
                <TouchableOpacity style={styles.nullButton} onPress={props.onClear}>
                    <Ionicons name="remove-circle-outline" size={20} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => props.onPressNumber("0")}>
                    <Text style={styles.text}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nullButton} onPress={props.onDelete}>
                    <Ionicons name="backspace-outline" size={20} />
                </TouchableOpacity>
            </View> 

        </View>
    )
}


const styles = StyleSheet.create({
    content: {
        gap: 10
    },
    line: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around"
    },
    button: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        width: "20%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    nullButton: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        width: "20%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontWeight: "700",
        fontSize: 18
    }
})