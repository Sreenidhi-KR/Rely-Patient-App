import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
} from "react-native";
import { List, Avatar } from "react-native-paper";

const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};

const DoctorListScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDoctors = async () => {
    try {
      const response = await fetch(
        "https://bdcc-119-161-98-68.in.ngrok.io/api/v1/doctor/getAllDoctors"
      );
      const json = await response.json();
      // console.log(json);
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "white" }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <List.Item
                title={`${item.fname} ${item.lname}`}
                description={`${item.qualification} , ${item.specialization}`}
                left={(props) => (
                  // <Avatar.Text
                  //   size={50}
                  //   label="XD"
                  //   style={{ backgroundColor: randomRGB() }}
                  // />
                  <Image
                    source={require(`../../../assets/general-doc.png`)}
                    style={{ width: 55, height: 55 }}
                  />
                )}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  box: {
    height: 100,
    width: "90%",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#F5ECFF",
  },
});

export default DoctorListScreen;
