import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import MySnackBar from "../../components/MySnackBar";
import imagePaths from "../../constants/imagePaths";
import Toast from "react-native-simple-toast";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");

  const { isLoading, register } = useContext(AuthContext);

  const startRegister = async (name, email, password) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      Toast.show("Invalid Email", 5);
      return;
    }
    if (password?.length < 5) {
      Toast.show("Password should be minimum of 5 digits", 5);
      return;
    }
    if (name?.length < 5) {
      Toast.show("Name should be minimum of 5 digits", 5);
      return;
    }

    try {
      await register(name, email, password);
      setSnackBarText("Register Successful");
      setShowSnackbar(true);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      setSnackBarText(`Register Failed : ${error.response.data.message}`);
      setShowSnackbar(true);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Image source={imagePaths.logo} style={{ width: 300, height: 200 }} />
      <View style={styles.wrapper}>
        <TextInput
          mode="outlined"
          style={styles.input}
          value={name}
          textColor="black"
          placeholder="Enter name"
          maxLength={20}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          value={email}
          textColor="black"
          textContentType="emailAddress"
          placeholder="Enter email"
          maxLength={50}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          mode="outlined"
          style={styles.input}
          value={password}
          textColor="black"
          maxLength={30}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button
          style={styles.button}
          textColor="white"
          onPress={() => {
            startRegister(name, email, password);
          }}
        >
          Register
        </Button>

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Already have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <MySnackBar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        snackBarText={snackBarText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  wrapper: {
    width: "80%",
  },
  button: {
    paddingVertical: 3,
    backgroundColor: "#5e17eb",
  },
  input: {
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  link: {
    color: "#5e17eb",
  },
});

export default RegisterScreen;
