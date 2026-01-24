export type RootStackParamList = {
    splash: undefined;
    signin: undefined;
    signup: undefined;
    registervehicle: {phone: string, registerinfo: any};
    welcome: undefined;
    recoverpassword: undefined;
    otp: {phone: string}
    typepassword: {phone: string}
    
    tabs: undefined
    home: undefined
    settings: undefined;
    travels: undefined;
    publishtravel: undefined;

    travelRequest: {travelId: string}
    traveldetails: {travelDetails: any}
}