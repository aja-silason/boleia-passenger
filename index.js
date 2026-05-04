import { registerRootComponent } from "expo";
import { enableScreens } from 'react-native-screens';
import App from "./app/index";

registerRootComponent(App);
enableScreens();