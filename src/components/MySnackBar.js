import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const MySnackBar = ({ showSnackbar, setShowSnackbar, snackBarText }) => {
  return (
    <Snackbar
      visible={showSnackbar}
      duration={4000}
      style={{
        backgroundColor: "#5e17eb",
      }}
      wrapperStyle={{}}
      onDismiss={() => {
        setShowSnackbar(false);
      }}
      action={{}}
      onIconPress={() => {}}
    >
      {snackBarText}
    </Snackbar>
  );
};

export default MySnackBar;
