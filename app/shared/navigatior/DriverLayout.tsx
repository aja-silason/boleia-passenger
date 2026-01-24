import HomeScreen from "@/app/view/HomeScreen";
import SettingsScreen from "@/app/view/SettingsScreen";
import TravelsScreen from "@/app/view/TravelsScreen";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function DriverLayout(){
    
    const Tabs = createBottomTabNavigator();

    return (
        <Tabs.Navigator>
            <Tabs.Screen 
                name="index"
                component={HomeScreen} 
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
                component={TravelsScreen} 
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
                component={SettingsScreen} 
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