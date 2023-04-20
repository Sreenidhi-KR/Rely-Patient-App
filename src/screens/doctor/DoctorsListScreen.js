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
import routes from "../../navigation/routes";
import { getAllDoctors } from "../../service/DoctorService";

const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red},${green},${blue})`;
};

const DoctorListScreen = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { specialization } = route.params;

  const getDoctors = async () => {
    try {
      const json = await getAllDoctors();
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
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.wrapper}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.box}>
                <List.Item
                  onPress={() => {
                    console.log(item.fname);
                    navigation.navigate(routes.DOCTOR_DETAILS, {
                      doctor: item,
                    });
                  }}
                  descriptionStyle={{
                    color: "gray",
                    fontSize: 10,
                    fontWeight: "300",
                  }}
                  title={
                    <Text
                      style={{
                        color: "black",
                        fontSize: 18,
                        fontWeight: "500",
                      }}
                    >
                      {`${item.fname} ${item.lname}`}
                    </Text>
                  }
                  description={`${item.qualification}`}
                  left={(props) => (
                    <Image
                      source={require(`../../../assets/general-doc.png`)}
                      style={{ width: 55, height: 55 }}
                    />
                  )}
                  right={(props) =>
                    item.online_status ? (
                      <Text style={{ alignSelf: "center" }}>🟢 </Text>
                    ) : (
                      <Text style={{ alignSelf: "center" }}>🔴</Text>
                    )
                  }
                />
              </View>
            )}
          />
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
  wrapper: {},
  box: {
    height: 100,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 10,
    backgroundColor: "#F7F8FF",
  },
});

export default DoctorListScreen;
