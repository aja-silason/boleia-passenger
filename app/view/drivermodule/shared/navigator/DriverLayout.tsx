import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeDriverScreen from "../../view/HomeDriverScreen";
import SettingsDriverScreen from "../../view/SettingsDriverScreen";
import TravelsDriverScreen from "../../view/TravelsDriverScreen";

export default function DriverLayout(){
    
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator backBehavior="history">
            <Tabs.Screen 
                name="index"
                component={HomeDriverScreen} 
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarActiveTintColor: Colors.background,
                    tabBarInactiveTintColor: Colors.placeHolder,
                    tabBarIcon: ({color, focused, size}) => (
                        <Ionicons name="home-outline" color={focused ? Colors.background : color} size={size}/>
                    )
                }}
            />

            <Tabs.Screen 
                name="travels"
                component={TravelsDriverScreen} 
                options={{
                    headerShown: false,
                    title: "Viagens",
                    tabBarActiveTintColor: Colors.background,
                    tabBarInactiveTintColor: Colors.placeHolder,
                    tabBarIcon: ({color, focused, size}) => (
                        <Ionicons name="map-outline" color={focused ? Colors.background : color} size={size}/>
                    )
                }}
            />

            <Tabs.Screen 
                name="settings"
                component={SettingsDriverScreen} 
                options={{
                    headerShown: false,
                    title: "Configurações",
                    tabBarActiveTintColor: Colors.background,
                    tabBarInactiveTintColor: Colors.placeHolder,
                    tabBarIcon: ({color, focused, size}) => (
                        <Ionicons name="settings-outline" color={focused ? Colors.background : color} size={size}/>
                    )
                }}
            />

        </Tabs.Navigator>
    )
}