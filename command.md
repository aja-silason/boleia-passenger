Colocar a rede no terminal, caso a tenha redes disitantas na máquina

    set REACT_NATIVE_PACKAGER_HOSTNAME="Ip da rede"
    set EXPO_PACKAGER_HOSTNAME="Ip da rede"

Rodar a app via usb com expo
    adb reverse tcp:8082 tcp:8081
    npx expo start --localhost


Expo token
    3i5Yp3Vvx9VivmsD-kBD-_4d7MsAZLRb0KdbSFDK

Verificar esse link
    [text](.github/workflows/eas-development.build.yml)


Vincular uma branch para o canal

    npx eas channel:edit staging --branch preview