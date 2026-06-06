import { RootStackParamList } from "@/app/shared/route";
import SplashScreen from "@/app/view";
import DriverLayout from "@/app/view/drivermodule/shared/navigator/DriverLayout";
import TypePasswordDriverScreen from "@/app/view/drivermodule/view/password/TypePasswordDriverScreen";
import AccountDataDriverScreen from "@/app/view/drivermodule/view/settings/AccountDataDriverScreen";
import CentrallCallDriverScreen from "@/app/view/drivermodule/view/settings/CentralCallDriverScreen";
import NotificationsDriverScreen from "@/app/view/drivermodule/view/settings/NotificationsDriverScreen";
import PrivacyPoliticsDriverScreen from "@/app/view/drivermodule/view/settings/PrivacyPoliticsDriverScreen";
import SecurityDriverScreen from "@/app/view/drivermodule/view/settings/SecurityDriverScreen";
import SupportDriverScreen from "@/app/view/drivermodule/view/settings/SupportDriverScreen";
import UseTermsDriverScreen from "@/app/view/drivermodule/view/settings/UseTermsDriverScreen";
import SignUpDriverScreen from "@/app/view/drivermodule/view/SignUpDriverScreen";
import PublishTravelDriverScreen from "@/app/view/drivermodule/view/travel/PublishTravelDriverScreen";
import TravelDetailsDriverScreen from "@/app/view/drivermodule/view/travel/TravelDetailsDriverScreen";
import { TravelFinishedDriverSplash } from "@/app/view/drivermodule/view/travel/TravelFinishedDriverSplash";
import TravelRequestDriverScreen from "@/app/view/drivermodule/view/travel/TravelRequestDriverScreen";
import EditVehicleDriverScreen from "@/app/view/drivermodule/view/vehicle/EditVehicleDriverScreen";
import MyVehiclesDriverScreen from "@/app/view/drivermodule/view/vehicle/MyVehiclesDriverScreen";
import RegisterMyVehicleDriverScreen from "@/app/view/drivermodule/view/vehicle/RegisterMyVehicleDriverScreen";
import VehicleDetailsDriverScreen from "@/app/view/drivermodule/view/vehicle/VehicleDetailsDriverScreen";
import Map from "@/app/view/Map";
import { OtpconfirmScreen } from "@/app/view/OtpconfirmScreen";
import { OtpCreatePasswordScreen } from "@/app/view/OtpCreatePasswordScreen";
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
import TypeOfUserScreen from "@/app/view/TypeOfUserScreen";
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
            <Stack.Group>
                <Stack.Screen name="reloadScreen" component={ReloadScreen} />
                <Stack.Screen name="splash" component={SplashScreen} />
                <Stack.Screen name="welcome" component={WelcomeScreen} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="signin" component={SignInScreen} />
                <Stack.Screen name="signup" component={SignUpScreen} />
                <Stack.Screen name="otp" component={OtpconfirmScreen} />
                <Stack.Screen name="createPassword" component={OtpCreatePasswordScreen} />
            </Stack.Group>

            <Stack.Group>
                <Stack.Screen name="tabs" component={PassangerLayout} />
                <Stack.Screen name="travelavailable" component={TravelAvailableScreen} />
                <Stack.Screen name="supportScreen" component={SupportScreen} />
                <Stack.Screen name="chatAndSupport" component={ChatAndSupportScreen} />
                <Stack.Screen name="notifications" component={NotificationsScreen} />
                <Stack.Screen name="traveldetails" component={TravelDetailsScreen} />
                <Stack.Screen name="map" component={Map} />
                <Stack.Screen name="accountData" component={AccountDataScreen} />
                <Stack.Screen name="central" component={CentrallCallScreen} />
                <Stack.Screen name="useTerms" component={UseTermsScreen} />
                <Stack.Screen name="privacyPolitics" component={PrivacyPoliticsScreen} />
                <Stack.Screen name="security" component={SecurityScreen} />
            </Stack.Group>
            
            <Stack.Screen name="typeOfUser" component={TypeOfUserScreen} />


            <Stack.Group>
                <Stack.Screen name="tabsDriver" component={DriverLayout} />
                <Stack.Screen name="signupDriver" component={SignUpDriverScreen} />
                <Stack.Screen name="typepassword" component={TypePasswordDriverScreen} />
                <Stack.Screen name="travelRequest" component={TravelRequestDriverScreen} />
                <Stack.Screen name="traveldetailsDriver" component={TravelDetailsDriverScreen} />
                <Stack.Screen name="travelFinishSplah" component={TravelFinishedDriverSplash} />
                <Stack.Screen name="publishtravel" component={PublishTravelDriverScreen} />
                <Stack.Screen name="myVehicles" component={MyVehiclesDriverScreen} />
                <Stack.Screen name="registerMyVehicle" component={RegisterMyVehicleDriverScreen} />
                <Stack.Screen name="vehicleDetailsDriver" component={VehicleDetailsDriverScreen} />
                <Stack.Screen name="editVehicle" component={EditVehicleDriverScreen} />
                <Stack.Screen name="accountDataDriver" component={AccountDataDriverScreen} />
                <Stack.Screen name="notificationsScreen" component={NotificationsDriverScreen} />
                <Stack.Screen name="supportScreenDriver" component={SupportDriverScreen} />
                <Stack.Screen name="chatAndSupportDriver" component={ChatAndSupportScreen} />
                <Stack.Screen name="useTermsDriver" component={UseTermsDriverScreen} />
                <Stack.Screen name="privacyPoliticsDriver" component={PrivacyPoliticsDriverScreen} />
                <Stack.Screen name="securityDriver" component={SecurityDriverScreen} />
                <Stack.Screen name="centralDriver" component={CentrallCallDriverScreen} />
            </Stack.Group>







        </Stack.Navigator>
    )
}