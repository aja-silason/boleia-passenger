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
        <Stack.Navigator initialRouteName="splash"
        screenOptions={{
            headerShown: false,
            statusBarStyle: "inverted"
        }}
        >
            <Stack.Screen name="reloadScreen" component={ReloadScreen} />
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="signin" component={SignInScreen} />
            <Stack.Screen name="signup" component={SignUpScreen} />
            <Stack.Screen name="otp" component={OtpconfirmScreen} />
            
            <Stack.Screen name="tabs" component={PassangerLayout} />
            <Stack.Screen name="travelavailable" component={TravelAvailableScreen} />
            <Stack.Screen name="supportScreen" component={SupportScreen} />
            <Stack.Screen name="chatAndSupport" component={ChatAndSupportScreen} />
            <Stack.Screen name="notifications" component={NotificationsScreen} />
            
            <Stack.Screen name="traveldetails" component={TravelDetailsScreen} />
            {/* <Stack.Screen name="publishtravel" component={PublishTravelScreen} /> */}
            
            <Stack.Screen name="map" component={Map} />
            <Stack.Screen name="accountData" component={AccountDataScreen} />
            <Stack.Screen name="central" component={CentrallCallScreen} />
            <Stack.Screen name="useTerms" component={UseTermsScreen} />
            <Stack.Screen name="privacyPolitics" component={PrivacyPoliticsScreen} />
            <Stack.Screen name="security" component={SecurityScreen} />

        </Stack.Navigator>
    )
}