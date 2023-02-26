//import liraries
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { List, Avatar } from "react-native-paper";
import SquareTile from "../../components/user/SquareTile";
import routes from "../../navigation/routes";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <List.Item
        style={{ margin: 10, marginTop: 35 }}
        title={`Hello Kiran`}
        description={`How are you feeling today !!`}
        left={(props) => (
          <Image
            source={require(`../../../assets/man.png`)}
            style={{ width: 50, height: 50 }}
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SquareTile
          imgSrc={require("../../../assets/general-doc.png")}
          color={"#ECF9E3"}
          text={"General Consulatation"}
        />
        <SquareTile
          imgSrc={require("../../../assets/special-doc.png")}
          color={"#F9E3E3"}
          text={"Specialist Consulatation"}
          onPress={() => navigation.navigate(routes.DOCTOR_LIST)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  text: {
    fontSize: 12,
  },
});

export default HomeScreen;
