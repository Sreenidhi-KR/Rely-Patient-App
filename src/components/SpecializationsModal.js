import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import doctorSpecializations from "../constants/doctorSpecializations";
import routes from "../navigation/routes";
import { horizontalScale, verticalScale } from "../constants/metrics";

const SpecializationsModal = ({ navigation, hideModal }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <FlatList
        persistentScrollbar
        keyExtractor={(item) => item.name}
        data={doctorSpecializations}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                hideModal();
                navigation.navigate(routes.DOCTOR_LIST, {
                  specialization: item.name,
                });
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: horizontalScale(100),
                  height: verticalScale(120),
                }}
              >
                <Image source={item.url} style={styles.image} />
                <Text style={{ fontSize: 12, marginTop: 5 }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: verticalScale(50),
    width: horizontalScale(50),
    margin: verticalScale(10),
  },
});

export default SpecializationsModal;
