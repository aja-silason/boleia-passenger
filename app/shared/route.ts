export type RootStackParamList = {
    splash: undefined;
    signin: {phone: string};
    signup: undefined;
    registervehicle: {phone: string, registerinfo: any};
    welcome: undefined;
    recoverpassword: undefined;
    otp: undefined
    typepassword: {phone: string}
    
    tabs: undefined
    home: undefined
    settings: undefined;
    travels: undefined;
    publishtravel: undefined;

    travelRequest: {travelId: string}
    traveldetails: {travelDetails: any}
}