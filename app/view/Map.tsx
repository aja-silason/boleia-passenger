import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBack } from "./components/header/HeaderBack";
// import {GoogleMaps} from "expo-maps";

export default function Map() {
    return (
        <View style={styles.container}>
            <HeaderBack description="" />
            <SafeAreaView style={{alignItems: "center", justifyContent: "center", alignContent: "center", height: "80%"}}>
                <Text>Integração com o mapa das corridas</Text>
                <Text>Em processamento</Text>
            </SafeAreaView>


        </View>
    )

    
    // const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    // const route = useRoute<RouteProp<RootStackParamList, "map_tracking">>()

    // const points: LocationPoint[] = route?.params.tracking || []


    // const parsed = useMemo(() => points?.map(
    //     pos => ({
    //         ...pos,
    //         lat: parseFloat(pos.latitude),
    //         lng: parseFloat(pos.longitude),
    //     }))?.filter(pos => Number.isFinite(pos.lat) && Number.isFinite(pos.lng)),
    //     [points]
    // )


    // const firstPoint = parsed[0]; 

    // const [address, setAddress] = useState<string>("Carregando localização...");

    // useEffect(() => {
    //     const getAddress = async () => {
    //     if (!firstPoint) return;
    //     try {
    //         const [loc] = await Location.reverseGeocodeAsync({
    //             latitude: firstPoint.lat,
    //             longitude: firstPoint.lng,
    //         });
    //         setAddress(`${loc.name}, ${loc.city}, ${loc.region}, ${loc.country}`);
    //     } catch (e) {
    //         setAddress("Endereço não encontrado");
    //     }
    //     };
    //     getAddress();
    // }, [firstPoint]);


    // const initialRegion = useMemo(() => {
    //     if (parsed.length > 0) {
    //     const { lat, lng } = parsed[0];
    //     return {
    //         latitude: lat,
    //         longitude: lng,
    //         latitudeDelta: 0.01,
    //         longitudeDelta: 0.01,
    //     };
    //     }
    //     return {
    //         latitude: -8.82569,
    //         longitude: 13.2313376,
    //         latitudeDelta: 0.2,
    //         longitudeDelta: 0.2,
    //     };
    // }, [parsed]);

    // return (
    //     <View style={{marginBottom: 100}}>

    //         <View style={{marginHorizontal: 20, paddingTop: 40}}>
        
    //             <View style={[styles.topContent, {gap: 20, marginVertical: 10}]}>
    //                     <TouchableOpacity onPress={() => navigate.goBack()} style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}} activeOpacity={0.8}>
    //                         <Ionicons name="chevron-back"/>
    //                         <Text style={{color: Colors.light.primary[100], fontSize: 18, fontWeight: '600'}}>Rastreio do Produto</Text>                    
    //                     </TouchableOpacity>
        
    //                     <Text style={{fontSize: 13, color: Colors.light.gray[100], fontWeight: '400'}}>Acompanhe o percurso do produto até ao destino final, assegurando autenticidade, segurança e confiança.</Text>
        
    //                 </View>

    //             <View>

    //             <View style={{gap: 10}}>
    //                 <View style={{flexDirection: 'column'}}>
    //                     <Text style={{fontSize: 12, color: Colors.light.gray[100]}}>Primeira validação</Text>
    //                     <Text style={{fontSize: 13, color: Colors.light.black[100], fontWeight: '500'}}>{address}</Text>
    //                 </View>
    //             </View>
                    
    //             </View>
    //         </View>
            
    //         <SafeAreaView pointerEvents="box-none" style={{marginVertical: 20, height: "75%"}}>

    //             <GoogleMaps.View style={{flex: 1}} cameraPosition={{
    //                 coordinates: initialRegion
    //             }} markers={
    //                 parsed.map(pos => ({
    //                     coordinates: {latitude: +pos.latitude, longitude: +pos.longitude},
    //                     title: `IP: ${pos.ip}`,
    //                     id: pos.id 
    //                 }))
    //             }/>

    //         </SafeAreaView>

    //     </View>
    // )

}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 60,
        paddingHorizontal: 20
    }
})