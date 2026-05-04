import HomeScreen from "@/app/view/HomeScreen";
import SettingsScreen from "@/app/view/SettingsScreen";
import TravelsScreen from "@/app/view/TravelsScreen";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();

export default function PassangerLayout(){    

    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: Colors.background,
                tabBarInactiveTintColor: Colors.placeHolder,
                tabBarStyle: {
                    elevation: 0,
                    borderTopWidth: 0
                },
            }}
        >
            <Tabs.Screen 
                name="index"
                component={HomeScreen} 
                options={{
                    headerShown: false,
                    title: "Home",
                    freezeOnBlur: true,
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
                    freezeOnBlur: true,
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
                    freezeOnBlur: true,
                    tabBarIcon: ({color, focused, size}) => (
                        <Ionicons name="settings-outline" color={focused ? Colors.background : color} size={size}/>
                    )
                }}
            />

        </Tabs.Navigator>
    )
}