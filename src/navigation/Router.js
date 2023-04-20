import React, { Fragment, useContext, useEffect } from "react";
import { NavigationContainer, Image } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import {
  HomeScreen,
  ConsultationScreen,
  DocumentScreen,
  VideoCall,
  DoctorListScreen,
  DoctorQueueWaitingScreen,
  DoctorDetaisScreen,
  SplashScreen,
  ConsultationDetailsScreen,
  DoctorReviewScreen,
} from "../screens/";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SelectProfileScreen from "../screens/auth/SelectProfileScreen";
import imagePaths from "../constants/imagePaths";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();
const DocumentStack = createNativeStackNavigator();
const ConsultationStack = createNativeStackNavigator();

function HomeStackRenderer() {
  const { patientInfo } = useContext(AuthContext);
  return (
    <HomeStack.Navigator>
      {patientInfo == null || patientInfo.patientId == undefined ? (
        <HomeStack.Screen
          name={routes.SELECT_PROFILE}
          component={SelectProfileScreen}
          options={{ headerShown: false }}
        />
      ) : null}

      <HomeStack.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={routes.DOCTOR_LIST}
        component={DoctorListScreen}
      />

      <HomeStack.Screen
        name={routes.VIDEO}
        component={VideoCall}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={routes.DOCTOR_DETAILS}
        component={DoctorDetaisScreen}
      />
      <HomeStack.Screen
        name={routes.DOCTOR_WAITING}
        component={DoctorQueueWaitingScreen}
      />
      <HomeStack.Screen
        name={routes.DOCTOR_REVIEW}
        component={DoctorReviewScreen}
      />
    </HomeStack.Navigator>
  );
}

function DocumentStackRenderer() {
  return (
    <DocumentStack.Navigator>
      <DocumentStack.Screen
        name={routes.DOCUMENTS}
        component={DocumentScreen}
        options={{ headerShown: false }}
      />
    </DocumentStack.Navigator>
  );
}

function ConsultationStackRenderer() {
  return (
    <ConsultationStack.Navigator>
      <ConsultationStack.Screen
        name={routes.CONSULTATION}
        component={ConsultationScreen}
        options={{ headerShown: false }}
      />
      <ConsultationStack.Screen
        name={routes.CONSULTATION_DETAILS}
        component={ConsultationDetailsScreen}
        options={{ headerShown: false }}
      />
    </ConsultationStack.Navigator>
  );
}

function Router() {
  const { userInfo, bottomBarVisible, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {splashLoading ? (
        <Stack.Navigator>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : !userInfo.accessToken ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Fragment>
          <Tab.Navigator
            labeled={false}
            barStyle={{
              display: bottomBarVisible ? null : "none",
              backgroundColor: "white",
              borderTopColor: "#FDFCFD",
              borderWidth: 0.8,
            }}
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
              name="HomeStack"
              component={HomeStackRenderer}
              options={{
                headerShown: false,
                unmountOnBlur: true,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={22} />
                ),
              }}
            />
            <Tab.Screen
              name="ConsultationStack"
              component={ConsultationStackRenderer}
              options={{
                headerShown: true,
                unmountOnBlur: true,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="account-group"
                    color={color}
                    size={22}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="DocumentStack"
              component={DocumentStackRenderer}
              options={{
                headerShown: true,
                unmountOnBlur: true,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="file-document"
                    color={color}
                    size={22}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </Fragment>
      )}
    </NavigationContainer>
  );
}

export default Router;
