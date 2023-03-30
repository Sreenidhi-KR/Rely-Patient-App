import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { userLogin, userRegister } from "../service/LoginService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = async (name, password) => {
    setIsLoading(true);

    try {
      const res = await userLogin(name, password);
      setUserInfo(res);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (e) {
      console.log(`register error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);

    try {
      await userRegister(name, email, password);
    } catch (e) {
      console.log(`register error ${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem("userInfo");
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);
      console.log("userInfo");
      console.log(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
