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
import routes from "../../navigation/routes";
// create a component
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <List.Item
        style={{ margin: 10, marginTop: 30 }}
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
        <TouchableOpacity>
          <View style={styles.box_green}>
            <Image
              source={require(`../../../assets/general-doc.png`)}
              style={{ width: 70, height: 70, margin: 20 }}
            />
            <Text style={styles.text}>General Consulatation</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(routes.DOCTOR_LIST)}
        >
          <View style={styles.box_red}>
            <Image
              source={require(`../../../assets/special-doc.png`)}
              style={{ width: 70, height: 70, margin: 20 }}
            />
            <Text style={styles.text}>Specialist Consulatation</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  box_green: {
    height: 200,
    width: 170,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    opacity: 10,
    backgroundColor: "#ECF9E3",
    justifyContent: "center",
    alignItems: "center",
  },
  box_red: {
    height: 200,
    width: 170,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    opacity: 10,
    backgroundColor: "#F9E3E3",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
});

//make this component available to the app
export default HomeScreen;
