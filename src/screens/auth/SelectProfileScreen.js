//import liraries
import React, { Component, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator, Button, List } from "react-native-paper";
import SquareTile from "../../components/SquareTile";
import { AuthContext } from "../../context/AuthContext";
import { getProfilesForUser } from "../../service/UserService";
import imagePaths from "../../constants/imagePaths";
import AddProfile from "../user/AddProfile";
import routes from "../../navigation/routes";
import { verticalScale } from "../../constants/metrics";
// create a component
const SelectProfileScreen = ({ navigation, route }) => {
  const { setBottomBarVisible, setPatientInfo, logout } =
    useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProfiles();
    setBottomBarVisible(false);
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });

    return () => {
      setBottomBarVisible(true);
    };
  }, [navigation]);

  const getProfiles = async () => {
    const patients = await getProfilesForUser();
    setProfiles(patients);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginTop: 30 }}>
          <List.Section
            title="Choose Profile"
            titleStyle={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
          ></List.Section>
          <View style={styles.squareTiles}>
            {profiles ? (
              profiles.map((patient) => {
                return (
                  
                    <SquareTile
                      key={patient.id}
                      imgSrc={imagePaths.avatar_man}
                      color={"#ECF9E3"}
                      text={patient.fname}
                      onPress={() => {
                        setPatientInfo({
                          patientId: patient.id,
                          patientName: patient.fname,
                        });
                      }}
                    />
                  
                );
              })
            ) : (
              <Button
                onPress={() => {
                  setPatientInfo({});
                  logout();
                }}
              >
                Logout
              </Button>
            )}
            {profiles && profiles.length < 4 ? (
              <SquareTile
                imgSrc={imagePaths.add_Patient}
                color={"#ECF9E3"}
                text="Add Patient Profile"
                onPress={() => {
                  navigation.navigate(routes.ADD_PROFILE, { setProfiles });
                }}
              />
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  squareTiles: {
    margin: 10,
    flexDirection: "row",
    height: verticalScale(180),
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

//make this component available to the app
export default SelectProfileScreen;
