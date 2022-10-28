import React from "react";
import { BottomNavigation } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashBoardview from "../Dashboard/DashBoardview";
import ToolsView from "../Dashboard/ToolsView";
import ProductsView from "../Dashboard/ProductsView";
import InsightView from "../Dashboard/InsightView";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";
import Analytics from "../insights/analytics";
import { Image, View } from "react-native";

const Tab = createBottomTabNavigator();

function BottomNavigationView(props) {
  return (
    <Tab.Navigator
      initialRouteName="Home"      
      screenOptions={{        
        headerShown: false,
        tabBarActiveTintColor: colors.primaryColor,
        tabBarInactiveTintColor: "#CFD2CF",
      }}
      safeAreaInsets={{ bottom: 10 }}
    >
      <Tab.Screen
        name="Home"
        component={DashBoardview}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 15 },
          
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/homeIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="center"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsView}
        options={{
          tabBarLabel: "Tools",
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/toolsIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="center"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsView}
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/icon_treatment.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="center"
            />
          ),
          tabBarLabelStyle: { fontSize: 15 },
        }}
      />
      <Tab.Screen
        name="Insights"
        component={Analytics}
        options={{
          tabBarLabel: "Insights",
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../../assets/icons/insightsIcon.png")}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="center"
            />
          ),
          tabBarLabelStyle: { fontSize: 15 },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigationView;
