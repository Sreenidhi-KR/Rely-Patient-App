//import liraries
import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, FlatList } from "react-native";
import { List, Text } from "react-native-paper";
import routes from "../../navigation/routes";
import { getAllPreviousConsultations } from "../../service/ConsultationService";

// create a component
const ConsultationScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const patientId = 1;
  const startTime = "09:00 28/01/2022";

  const getDateTime = (starttime) => {
    const dateObj = new Date(starttime);

    const options = {
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      dateStyle: "short",
    };

    const dateString = dateObj.toLocaleString("en-US", options);

    const d = dateString.split(/[' ']/);
    const weekday = d[0];
    const monthname = d[1];
    const year = d[4];
    const t = d[3].split(/[':']/);
    const time = t[0] + ":" + t[1];
    const day = dateObj.getDate();
    const ordinalIndicator = getOrdinalIndicator(day);
    const formattedDay = `${day}${ordinalIndicator}`;

    const formattedDate1 = `${formattedDay}-${monthname}`;
    const formattedDate2 = `${formattedDate1}-${year}-${time}`;

    function getOrdinalIndicator(day) {
      const j = day % 10,
        k = day % 100;
      if (j == 1 && k != 11) {
        return "st";
      }
      if (j == 2 && k != 12) {
        return "nd";
      }
      if (j == 3 && k != 13) {
        return "rd";
      }
      return "th";
    }

    return { formattedDate1, formattedDate2 };
  };

  const getPreviousConsultations = async (patientId) => {
    try {
      const json = await getAllPreviousConsultations(patientId);
      console.log("Json msg");
      console.log(json);
      setData(json);
    } catch (error) {
      console.log("error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPreviousConsultations(patientId);
  }, []);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator style={styles.indicator} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.consult_id}
          renderItem={({ item }) => (
            <View style={styles.box}>
              <List.Item
                onPress={() => {
                  console.log("Prev_Consultation");
                  navigation.navigate(routes.CONSULTATION_DETAILS, {
                    consultation: item,
                  });
                }}
                titleStyle={{
                  color: "black",
                  fontSize: 30,
                  fontFamily: "serif",
                  marginBottom: 2,
                }}
                title={`Dr.${item.doctorName}`}
                descriptionStyle={{ color: "black" }}
                description={
                  <Text
                    numberOfLines={3}
                    style={{ color: "black", fontSize: 15 }}
                  >
                    {item.specialization}
                    {"\n"}
                    {getDateTime(item.startTime).formattedDate1}
                  </Text>
                }
                // description={`13:45-12/01/2023    14:09-12/01/2023`}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  indicator: {
    height: "50%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    //padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
  },
  box: {
    height: 120,
    width: "92%",
    padding: 10,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "#F5ECFF",
  },
});

//make this component available to the app
export default ConsultationScreen;
