import { Colors } from "@/constants/theme";
import { ReactNode, useCallback, useRef } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
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
    debounceMS?: number
}

export const Button = ({ 
    text, 
    isPrimary = true, 
    isLoading = false, 
    disabled = false, 
    onPress, 
    halfWidth, 
    icon,
    style: customStyle,
    debounceMS = 300
}: Props) => {
    
    const isDisabled = disabled || isLoading;

    const lastPress = useRef(0);

    const handlePress = useCallback(() => {
        const now = Date.now();
        if (now - lastPress.current <debounceMS) return;
        lastPress.current = now;
        onPress();
    }, [onPress, debounceMS]);


    return (
        <Pressable
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={({ pressed }) => [
                styles.container,
                isPrimary ? styles.primary : styles.secondary,
                halfWidth && styles.middleSize,
                isDisabled && styles.disabled,
                pressed && !isDisabled && styles.pressed,
                customStyle
            ]}
            onPress={handlePress}
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
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderRadius: 12,
        minHeight: 54,
        justifyContent: "center",
        alignItems: "center"
    },
    pressed: {
        opacity: 0.8
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        paddingHorizontal: 15,
        overflow: 'hidden'
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