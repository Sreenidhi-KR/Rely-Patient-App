import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import { HomeScreen } from "../screens/";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DocumentScreen from "../screens/user/DocumentsScreen";
import ConsultationScreen from "../screens/user/ConsultationScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routes.HOME}
        labeled={false}
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen
          name={routes.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={22} />
            ),
          }}
        />
        <Tab.Screen
          name={routes.DOCUMENTS}
          component={DocumentScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="file-document"
                color={color}
                size={22}
              />
            ),
          }}
        />
        <Tab.Screen
          name={routes.CONSULTATION}
          component={ConsultationScreen}
          options={{
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={22}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
