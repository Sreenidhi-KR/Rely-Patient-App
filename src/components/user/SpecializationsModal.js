import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import doctorSpecializations from "../../constants/doctorSpecializations";
import routes from "../../navigation/routes";

const SpecializationsModal = ({ navigation, hideModal }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={doctorSpecializations}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                hideModal();
                navigation.navigate(routes.DOCTOR_LIST);
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={styles.container}></View>
                <Text style={{ fontSize: 12 }}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 60,
    marginHorizontal: "7%",
    marginVertical: "15%",
    backgroundColor: "#2c3e50",
  },
});

export default SpecializationsModal;
