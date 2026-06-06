import { TravelOutput } from "../infra/service/travel/TravelOutput";
import { VehicleOutput } from "../view/drivermodule/infra/service/vehicle/VehicleOutput";

export type RootStackParamList = {
    reloadScreen: undefined;
    splash: undefined;
    signin: undefined;
    signup: undefined;
    welcome: undefined;
    otp: { phone: string }
    createPassword: { phone: string }
    
    tabs: undefined
    home: undefined
    settings: undefined;
    travels: undefined;

    travelavailable: {travels: TravelOutput[], from: string};

    publishtravel: undefined;

    supportScreen: undefined;
    notifications: undefined;

    travelRequest: {travelId: string}
    traveldetails: {travelDetails: TravelOutput | undefined, historic: boolean}
    map: undefined;
    accountData: undefined;
    chatAndSupport: undefined;
    central: undefined;
    useTerms: undefined;
    privacyPolitics: undefined;
    security: undefined;
    
    typeOfUser: undefined;







    // DRIVER

    signupDriver: undefined;
    recoverpassword: undefined;
    optrecovery: {phone: string}
    typepassword: {phoneNumber: string}
    
    tabsDriver: undefined
    homeDriver: undefined
    settingsDriver: undefined;
    travelsDriver: undefined;
    publishtravelDriver: undefined;
    myVehicles: undefined;
    vehicleDetailsDriver: {data: VehicleOutput};
    registerMyVehicle: undefined;
    editVehicle: {data: VehicleOutput};

    travelRequestDriver: {data: TravelOutput};
    traveldetailsDriver: {id: string | any};
    travelFinishSplah: undefined;

    accountDataDriver: undefined;
    notificationsScreen: undefined;
    supportScreenDriver: undefined;
    chatAndSupportDriver: undefined;
    useTermsDriver: undefined;
    privacyPoliticsDriver: undefined;
    securityDriver: undefined;
    centralDriver: undefined;
}