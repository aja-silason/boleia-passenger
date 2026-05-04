import { TravelOutput } from "../infra/service/travel/TravelOutput";

export type RootStackParamList = {
    reloadScreen: undefined;
    splash: undefined;
    signin: undefined;
    signup: undefined;
    welcome: undefined;
    otp: { phone: string }
    
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
    chatAndSupport: undefined
    central: undefined
    useTerms: undefined
    privacyPolitics: undefined
    security: undefined
}