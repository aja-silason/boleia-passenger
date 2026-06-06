import { RootStackParamList } from "@/app/shared/route";
import SplashScreen from "@/app/view";
import { OTPRecoveryPasswordScreen } from "@/app/view/password/OTPRecoveryPasswordScreen";
import { RecoveryPasswordScreen } from "@/app/view/password/RecoveryPasswordScreen";
import TypePasswordScreen from "@/app/view/password/TypePasswordScreen";
import RegisterVehicleScreen from "@/app/view/RegisterVehicleScreen";
import ReloadScreen from "@/app/view/ReloadScreen";
import AccountDataScreen from "@/app/view/settings/AccountDataScreen";
import CentrallCallScreen from "@/app/view/settings/CentralCallScreen";
import ChatAndSupportScreen from "@/app/view/settings/ChatAndSupportScreen";
import NotificationsScreen from "@/app/view/settings/NotificationsScreen";
import PrivacyPoliticsScreen from "@/app/view/settings/PrivacyPoliticsScreen";
import SecurityScreen from "@/app/view/settings/SecurityScreen";
import SupportScreen from "@/app/view/settings/SupportScreen";
import UseTermsScreen from "@/app/view/settings/UseTermsScreen";
import SignInScreen from "@/app/view/SignInScreen";
import SignUpScreen from "@/app/view/SignUpScreen";
import PublishTravelScreen from "@/app/view/travel/PublishTravelScreen";
import TravelDetailsScreen from "@/app/view/travel/TravelDetailsScreen";
import { TravelFinishedSplash } from "@/app/view/travel/TravelFinishedSplash";
import TravelRequestScreen from "@/app/view/travel/TravelRequestScreen";
import EditVehicleScreen from "@/app/view/vehicle/EditVehicleScreen";
import MyVehiclesScreen from "@/app/view/vehicle/MyVehiclesScreen";
import RegisterMyVehicleScreen from "@/app/view/vehicle/RegisterMyVehicleScreen";
import VehicleDetailsScreen from "@/app/view/vehicle/VehicleDetailsScreen";
import WelcomeScreen from "@/app/view/WelcomeScreen";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import DriverLayout from "./DriverLayout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator(){
    
    const navigate = useNavigation<NativeStackNavigationProp<RootStackParamList>>(); 

    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const travelId = response.notification.request.content.data.travelId;
            if (travelId) {
                navigate.navigate("traveldetails", {id: travelId as string});
            }
        });
        return () => subscription.remove();
    }, []);

    
    return (
        <Stack.Navigator 
            initialRouteName="splash"
            screenOptions={{
                headerShown: false,
                statusBarStyle: "inverted"
            }}
        >
            <Stack.Group>
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="reloadScreen" component={ReloadScreen} />
                <Stack.Screen name="welcome" component={WelcomeScreen} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="signin" component={SignInScreen} />
                <Stack.Screen name="signup" component={SignUpScreen} />
                <Stack.Screen name="recoverpassword" component={RecoveryPasswordScreen} />
                <Stack.Screen name="optrecovery" component={OTPRecoveryPasswordScreen} />
                <Stack.Screen name="typepassword" component={TypePasswordScreen} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="tabs" component={DriverLayout} />
                <Stack.Screen name="registervehicle" component={RegisterVehicleScreen} />
                <Stack.Screen name="travelRequest" component={TravelRequestScreen} />
                <Stack.Screen name="traveldetails" component={TravelDetailsScreen} />
                <Stack.Screen name="travelFinishSplah" component={TravelFinishedSplash} />
                <Stack.Screen name="publishtravel" component={PublishTravelScreen} />
                <Stack.Screen name="myVehicles" component={MyVehiclesScreen} />
                <Stack.Screen name="registerMyVehicle" component={RegisterMyVehicleScreen} />
                <Stack.Screen name="vehicleDetails" component={VehicleDetailsScreen} />
                <Stack.Screen name="editVehicle" component={EditVehicleScreen} />
                <Stack.Screen name="accountData" component={AccountDataScreen} />
                <Stack.Screen name="notificationsScreen" component={NotificationsScreen} />
                <Stack.Screen name="supportScreen" component={SupportScreen} />
                <Stack.Screen name="chatAndSupport" component={ChatAndSupportScreen} />
                <Stack.Screen name="useTerms" component={UseTermsScreen} />
                <Stack.Screen name="privacyPolitics" component={PrivacyPoliticsScreen} />
                <Stack.Screen name="security" component={SecurityScreen} />
                <Stack.Screen name="central" component={CentrallCallScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}