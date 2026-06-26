import { useAuthContext } from "@/app/shared/context/auth.context";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";
import { Driver } from "../service/entity/driver.service";

interface DocumentSide {
    uri: string | null;
}

export interface DocumentItem {
    id: string;
    name: string;
    front: DocumentSide;
    back: DocumentSide;
}

export const useSubmetDocuments = () => {
    const navigate = useNavigation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [documents, setDocuments] = useState<DocumentItem[]>([
        { id: "1", name: "Carta de Condução", front: { uri: null }, back: { uri: null } },
        { id: "2", name: "Bilhete de Identidade (BI)", front: { uri: null }, back: { uri: null } },
        { id: "3", name: "Livrete do Veículo", front: { uri: null }, back: { uri: null } },
    ]);

    const {userInformation} = useAuthContext();

    const handlePickImage = async (docId: string, side: "front" | "back") => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert("Permissão necessária", "Precisamos de acesso à sua câmera para fotografar os documentos.");
            return;
        }

        Alert.alert(
            "Capturar Documento",
            "Escolha como deseja enviar a imagem:",
            [
                {
                    text: "Tirar Foto (Câmera)",
                    onPress: async () => {
                        const result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            quality: 0.8,
                        });
                        if (!result.canceled) {
                            updateDocumentState(docId, side, result.assets[0].uri);
                        }
                    }
                },
                {
                    text: "Escolher da Galeria",
                    onPress: async () => {
                        const result = await ImagePicker.launchImageLibraryAsync({
                            allowsEditing: true,
                            quality: 0.8,
                        });
                        if (!result.canceled) {
                            updateDocumentState(docId, side, result.assets[0].uri);
                        }
                    }
                },
                { text: "Cancelar", style: "cancel" }
            ]
        );
    };

    const updateDocumentState = (docId: string, side: "front" | "back", uri: string) => {
        setDocuments(prevDocs => 
            prevDocs.map(doc => {
                if (doc.id === docId) {
                    return {
                        ...doc,
                        [side]: { uri }
                    };
                }
                return doc;
            })
        );
    };

    const handleSubmitAll = async () => {
        const allPhotosCaptured = documents.every(doc => doc.front.uri && doc.back.uri);
        
        if (!allPhotosCaptured) {
            Alert.alert("Documentos Incompletos", "Por favor, certifique-se de tirar a foto da Frente E do Verso de todos os documentos.");
            return;
        }

        setIsSubmitting(true);

        try {

            const formData = new FormData();

            documents.forEach((file) => {

                const frontImage = `${file.name.toLowerCase().replace(/ /g, '_')}_frente.jpg`;
                const backImage = `${file.name.toLowerCase().replace(/ /g, '_')}_verso.jpg`;
                
                formData.append("file", {
                    uri: file.front.uri,
                    name: frontImage,
                    type: "image/jpeg",
                } as any);

                formData.append("file", {
                    uri: file.back.uri,
                    name: backImage,
                    type: "image/jpeg",
                } as any);
    
            });

            const userId = userInformation?.id as string;

            const response = await Driver.driver.uploadDocument(formData, userId);

            if (!response) {
                throw new Error("Erro na resposta do servidor");
            }
            
            Alert.alert(
                "Sucesso!", 
                "As fotografias dos seus documentos foram enviadas. O gestor irá validar os dados nas próximas 24 horas.",
                [{ text: "Entendido", onPress: () => navigate.goBack() }]
            );
        } catch (error) {
            Alert.alert("Erro", "Falha ao enviar as imagens. Verifique a sua ligação à internet.");
        } finally {
            setIsSubmitting(false);
        }
    };


    return {
        isSubmitting,
        handlePickImage,
        handleSubmitAll,
        documents
    }
}