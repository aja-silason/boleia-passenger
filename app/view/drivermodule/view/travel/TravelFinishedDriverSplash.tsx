import { RootStackParamList } from '@/app/shared/route';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { BackHandler, StyleSheet, Text, View } from 'react-native';
import { BlueButton } from '../components/button/BlueButton';

export function TravelFinishedDriverSplash() {
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const backAction = () => {
            if(navigate.canGoBack()) {
                navigate.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [navigate]);

    return (
        <View style={styles.container}>
            <Ionicons name="checkmark-circle" size={100} color={Colors.primary} />
            <Text style={styles.title}>Viagem Finalizada!</Text>
            <Text style={styles.subtitle}>O resumo da sua atividade já está disponível no histórico.</Text>
            
            <View style={{ width: '100%', marginTop: 30 }}>
                <BlueButton
                    isLoading={false}
                    text="Voltar ao Início" 
                    onPress={() => navigate.navigate("tabsDriver")}
                    isBlue 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#FFF'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333'
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginTop: 10
    }
});