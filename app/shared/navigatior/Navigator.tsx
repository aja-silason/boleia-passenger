import { RootStackParamList } from "@/app/shared/route";
import SplashScreen from "@/app/view";
import Map from "@/app/view/Map";
import { OtpconfirmScreen } from "@/app/view/OtpconfirmScreen";
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
import TravelAvailableScreen from "@/app/view/travel/TravelAvailableScreen";
import TravelDetailsScreen from "@/app/view/travel/TravelDetailsScreen";
import WelcomeScreen from "@/app/view/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PassangerLayout from "./PassangerLayout";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator(){
    return (
        <Stack.Navigator initialRouteName="reloadScreen">
            <Stack.Screen name="reloadScreen" component={ReloadScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="signin" component={SignInScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="otp" component={OtpconfirmScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            
            <Stack.Screen name="tabs" component={PassangerLayout} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="travelavailable" component={TravelAvailableScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="supportScreen" component={SupportScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="chatAndSupport" component={ChatAndSupportScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="notifications" component={NotificationsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            
            <Stack.Screen name="traveldetails" component={TravelDetailsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            {/* <Stack.Screen name="publishtravel" component={PublishTravelScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} /> */}
            
            <Stack.Screen name="map" component={Map} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="accountData" component={AccountDataScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="central" component={CentrallCallScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="useTerms" component={UseTermsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="privacyPolitics" component={PrivacyPoliticsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />
            <Stack.Screen name="security" component={SecurityScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "auto"}} />

        </Stack.Navigator>
    )
}