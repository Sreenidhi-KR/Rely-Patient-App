//import liraries
import React, { useState, useEffect, useContext } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { List, Text, Divider, Button } from "react-native-paper";
import Header from "../../components/Header";
import routes from "../../navigation/routes";
import { getAllPreviousConsultations } from "../../service/ConsultationService";
import { downloadDocument } from "../../service/DocumentService";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

// create a component
const ConsultationScreen = ({ navigation }) => {
  //const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(true);
  const [data, setData] = useState([]);
  const { setBottomBarVisible, patientInfo } = useContext(AuthContext);
  const patientId = patientInfo.patientId;

  const getDateTime = (starttime) => {
    const dateObj = new Date(starttime);
    // console.log("dateObj", dateObj);

    const options = {
      year: "numeric",
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
    };

    const dateString = dateObj.toLocaleString("en-IN", options);
    // console.log("dateString", dateString);
    const d = dateString.split(/[' ']/);
    const monthname = d[1];
    const year = d[2];
    const t = d[3].split(/[':']/);
    const temp = t[0] == 0 || t[0] == 12 ? 12 : t[0] % 12;
    const time = temp + ":" + t[1];
    // console.log("time: ",t);
    const ap = t[0] != 0 && t[0] > 11 ? "PM" : "AM";

    const day = dateObj.getDate();
    const ordinalIndicator = getOrdinalIndicator(day);
    const formattedDay = `${day}${ordinalIndicator}`;

    const formattedDate1 = `${formattedDay} ${monthname} | ${time} ${ap}`;
    // console.log(formattedDate1);
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
      setRefreshing(true);
      const json = await getAllPreviousConsultations(patientId);
      setData(json);
    } catch (error) {
      console.log("error");
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("REEEEF");
      getPreviousConsultations(patientId);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Header />
        <>
          <Spinner visible={refreshing} />
          <List.Section
            title="My Consultations"
            titleStyle={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
          ></List.Section>
          <FlatList
            scrollEnabled
            showsVerticalScrollIndicator
            data={data}
            keyExtractor={(item) => item.consultId}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#F7F8FF",
                  marginHorizontal: 20,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
              >
                <List.Accordion
                  theme={{
                    colors: { background: "#F7F8FF" },
                  }}
                  titleStyle={{
                    color: "#414141",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  descriptionStyle={{ color: "gray", fontSize: 11 }}
                  title={`Dr.${item.doctorName}`}
                  description={getDateTime(`${item.startTime}`).formattedDate1}
                >
                  <>
                    <Divider />

                    <Text
                      style={{
                        color: "gray",
                        fontSize: 11,
                        fontWeight: "bold",
                        marginHorizontal: 15,
                        marginTop: 10,
                        marginBottom: 5,
                      }}
                    >
                      Documents
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        paddingLeft: 15,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.documentDetailsList.map((document) => {
                        return (
                          <TouchableOpacity
                            key={document.id}
                            onPress={() => {
                              console.log("Press");
                              downloadDocument(document.id);
                            }}
                          >
                            <View
                              style={{
                                ...styles.myChip,
                                backgroundColor: "#E8DDF8",
                              }}
                              // style={{
                              //   width: "auto",
                              //   overflow: "visible",
                              //   maxWidth: 150,
                              //   borderRadius: 10,
                              //   borderColor: "#564264",
                              //   borderWidth: 1,
                              //   padding: 8,
                              //   backgroundColor: "#E8DDF8",
                              //   margin: 3,
                              // }}
                            >
                              <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{ fontSize: 11, color: "#564264" }}
                              >
                                {document.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                      {item.prescription ? (
                        <TouchableOpacity
                          onPress={() => {
                            downloadDocument(prescription);
                          }}
                        >
                          <View
                            style={{
                              ...styles.myChip,
                              backgroundColor: "#edf8dd",
                            }}
                          >
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={{ fontSize: 11, color: "black" }}
                            >
                              Prescription
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    {/* <Divider
                    style={{ marginVertical: 10, backgroundColor: "#564264" }}
                  /> */}
                    <Text
                      style={{
                        color: "gray",
                        fontSize: 11,
                        fontWeight: "bold",
                        marginHorizontal: 15,
                        marginTop: 10,
                      }}
                    >
                      Follow Up
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        style={{ marginTop: 10 }}
                        mode="outlined"
                        textColor="grey"
                      >
                        Same Doctor
                      </Button>
                      <Button
                        onPress={() => {
                          navigation.navigate(routes.DOCTOR_LIST, {
                            followUp: item.consultId,
                          });
                        }}
                        style={{ marginTop: 10 }}
                        mode="outlined"
                        textColor="grey"
                      >
                        Different Doctor
                      </Button>
                    </View>
                  </>
                </List.Accordion>
              </View>
            )}
          />
        </>
      </View>
    </>
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
    backgroundColor: "white",
    flexDirection: "column",
  },
  myChip: {
    width: "auto",
    overflow: "visible",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 8,

    margin: 3,
  },
  box: {
    height: 120,
    width: "92%",
    padding: 10,
    margin: 15,
    borderRadius: 20,
    backgroundColor: "#F7F8FF",
  },
});

//make this component available to the app
export default ConsultationScreen;
