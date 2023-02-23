import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import { List, Avatar } from "react-native-paper";

const DoctorListScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDoctors = async () => {
    try {
      const response = await fetch(
        "https://bdcc-119-161-98-68.in.ngrok.io/api/v1/doctor/getAllDoctors"
      );
      const json = await response.json();
      console.log(json);
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
            <View>
              <List.Item
                title={`${item.fname} ${item.lname}`}
                description={`${item.qualification} ${item.specialization}`}
                left={(props) => <Avatar.Text size={50} label="XD" />}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DoctorListScreen;
