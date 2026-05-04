import { Colors } from "@/constants/theme";
import { ReactNode } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

type Props = {
    text: string;
    isPrimary?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    onPress: () => void;
    halfWidth?: boolean;
    icon?: ReactNode;
    style?: any;
}

export const Button = ({ 
    text, 
    isPrimary = true, 
    isLoading = false, 
    disabled = false, 
    onPress, 
    halfWidth, 
    icon,
    style: customStyle 
}: Props) => {
    
    const isDisabled = disabled || isLoading;

    return (
        <TouchableOpacity 
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={[
                styles.container, 
                isPrimary ? styles.primary : styles.secondary, 
                halfWidth && styles.middleSize,
                isDisabled && styles.disabled,
                customStyle
            ]} 
            activeOpacity={0.8} 
            onPress={() => {
                if (!isDisabled) {
                    onPress();
                }
            }}
            disabled={isDisabled}
        >
            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator 
                        color={isPrimary ? "#FFF" : Colors.primary} 
                        size="small"
                    />
                ) : (
                    <>
                        {icon && <View style={styles.iconContainer}>{icon}</View>}
                        <Text style={[
                            styles.baseText,
                            isPrimary ? styles.textPrimary : styles.textSecondary
                        ]}>
                            {text}
                        </Text>
                    </>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 12,
        minHeight: 54,
        justifyContent: "center",
        alignItems: "center",
        overflow: 'hidden', 
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        paddingHorizontal: 15,
    },
    middleSize: {
        flex: 1,
    },
    primary: {
        backgroundColor: Colors.primary
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: Colors.inactive,
    },
    disabled: {
        opacity: 0.8,
        borderColor: 'transparent'
    },
    baseText: {
        fontWeight: "700",
        fontSize: 14,
    },
    textPrimary: {
        color: Colors.blackText,
    },
    textSecondary: {
        color: Colors.inactive,
    },
    iconContainer: {
        marginRight: 8,
    }
});