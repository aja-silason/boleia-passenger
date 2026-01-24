import { QueryTravelRquest } from "../view/HomeScreen";

export type RootStackParamList = {
    splash: undefined;
    signin: undefined;
    signup: undefined;
    welcome: undefined;
    otp: {phone: string}
    
    tabs: undefined
    home: undefined
    settings: undefined;
    travels: undefined;

    travelavailable: {query: QueryTravelRquest};

    publishtravel: undefined;

    travelRequest: {travelId: string}
    traveldetails: {travelDetails: any, historic: boolean}
}