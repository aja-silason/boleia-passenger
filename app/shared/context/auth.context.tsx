import React, { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

import { LoginOutput } from "@/app/infra/service/entity/UserOutput";
import { default as Asyncstorage, default as AsyncStorage } from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";


type AuthState = {

    userInformation: LoginOutput | null ;
    
    isLoadingAuth: boolean,
    
    setIsLoadingAuth: Dispatch<SetStateAction<boolean>>

    addUserInfomation: (value: LoginOutput) => void;
    logOut: VoidFunction;

}

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {

    const [userInformation, setUserInfomation] = useState<LoginOutput | null>(null);
    const router = useRouter();
    
    const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

    useEffect(() => { 
        const loadStorageData = async () => {
            try {
                const userRaw = await AsyncStorage.getItem("DR1V3RUS3RB0L314");
                if (userRaw) {
                    setUserInfomation(JSON.parse(userRaw));
                }
            } catch (e) {
                console.error("Erro ao carregar dados do storage", e);
            } finally {
                setIsLoadingAuth(false);
            }
        };
        loadStorageData();
    }, []);

    const logOut = () => {
        Alert.alert("Terminar Sessão", "Tem certeza que deseja sair da sua conta?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Sair",
                style: "destructive",
                onPress: async () => {
                    await Asyncstorage.clear();
                    setUserInfomation(null);
                    router.replace("/view/SignInScreen")
                }
            }
        ]);
    }

    const addUserInfomation = (value: LoginOutput) => {
        setUserInfomation(value);
        Asyncstorage.setItem("DR1V3RUS3RB0L314", JSON?.stringify(value));
    }
    return (
        <AuthContext.Provider value={{addUserInfomation, userInformation, isLoadingAuth, logOut, setIsLoadingAuth}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuthContext = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside an AuthProvider");
    }

    return context;

}