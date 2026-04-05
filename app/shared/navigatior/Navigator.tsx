import { RootStackParamList } from "@/app/shared/route";
import SplashScreen from "@/app/view";
import { OtpconfirmScreen } from "@/app/view/OtpconfirmScreen";
import ReloadScreen from "@/app/view/ReloadScreen";
import NotificationsScreen from "@/app/view/settings/NotificationsScreen";
import SupportScreen from "@/app/view/settings/SupportScreen";
import SignInScreen from "@/app/view/SignInScreen";
import SignUpScreen from "@/app/view/SignUpScreen";
import PublishTravelScreen from "@/app/view/travel/PublishTravelScreen";
import TravelAvailableScreen from "@/app/view/travel/TravelAvailableScreen";
import TravelDetailsScreen from "@/app/view/travel/TravelDetailsScreen";
import WelcomeScreen from "@/app/view/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PassangerLayout from "./PassangerLayout";

export default function Navigator(){
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name="reloadScreen" component={ReloadScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="signin" component={SignInScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="otp" component={OtpconfirmScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            
            <Stack.Screen name="tabs" component={PassangerLayout} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="travelavailable" component={TravelAvailableScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="supportScreen" component={SupportScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="notifications" component={NotificationsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            
            <Stack.Screen name="traveldetails" component={TravelDetailsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="publishtravel" component={PublishTravelScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />

        </Stack.Navigator>
    )
}