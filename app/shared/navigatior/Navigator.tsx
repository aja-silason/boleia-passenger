import { RootStackParamList } from "@/app/shared/route";
import SplashScreen from "@/app/view";
import { OtpconfirmScreen } from "@/app/view/OtpconfirmScreen";
import { RecoveryPasswordScreen } from "@/app/view/password/RecoveryPasswordScreen";
import TypePasswordScreen from "@/app/view/password/TypePasswordScreen";
import RegisterVehicleScreen from "@/app/view/RegisterVehicleScreen";
import SignInScreen from "@/app/view/SignInScreen";
import SignUpScreen from "@/app/view/SignUpScreen";
import PublishTravelScreen from "@/app/view/travel/PublishTravelScreen";
import TravelDetailsScreen from "@/app/view/travel/TravelDetailsScreen";
import TravelRequestScreen from "@/app/view/travel/TravelRequestScreen";
import WelcomeScreen from "@/app/view/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriverLayout from "./DriverLayout";

export default function Navigator(){
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <Stack.Navigator>
            <Stack.Screen name="splash" component={SplashScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="welcome" component={WelcomeScreen} options={{headerShown: false, headerTransparent: true}} />
            <Stack.Screen name="signin" component={SignInScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="signup" component={SignUpScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="registervehicle" component={RegisterVehicleScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="recoverpassword" component={RecoveryPasswordScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="typepassword" component={TypePasswordScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="otp" component={OtpconfirmScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            
            <Stack.Screen name="tabs" component={DriverLayout} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="travelRequest" component={TravelRequestScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="traveldetails" component={TravelDetailsScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />
            <Stack.Screen name="publishtravel" component={PublishTravelScreen} options={{headerShown: false, headerTransparent: false, statusBarStyle: "dark"}} />

        </Stack.Navigator>
    )
}