import { RootStackParamList } from "@/app/shared/route";
import { Colors } from "@/constants/theme";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type props = {
    title?: string;
    description?: string;
    goBack?: VoidFunction;
    isOtp?: boolean;
    number?: string;
}

export const HeaderBack = (props: props) => {

    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.mainContent}>
            <View>
                <TouchableOpacity activeOpacity={.8} onPress={!props.goBack ? () => navigate.goBack() : props.goBack}>
                    <Ionicons name="arrow-back" size={20} color={Colors.placeholderText} />
                </TouchableOpacity>
            </View>
            <View style={styles.textContent}>
                {props.title && <Text style={styles.title}>{props.title}</Text>}
                <View style={styles.innerTextContent}>
                    {props.description && <Text style={styles.description}>{props.description}</Text>}
                    {props.isOtp && <Text>{props.number}</Text>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContent: {
        gap: 15
    },
    textContent: {
        gap: 5
    },
    innerTextContent: {
        flexDirection: "row",
        gap: 5,
        flexWrap: "wrap" 
    },
    title: {
        fontSize: 19,
        color: Colors.blackText,
        fontWeight: 700
    },
    description: {
        fontSize: 14,
        color: Colors.placeHolder
    }
})