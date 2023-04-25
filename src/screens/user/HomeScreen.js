//import libraries
import React, { Component, useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Alert, FlatList, ActivityIndicator, RefreshControl, Image } from "react-native";
import { Modal, Portal, List } from "react-native-paper";
import Header from "../../components/Header";
import SpecializationsModal from "../../components/SpecializationsModal";
import SquareTile from "../../components/SquareTile";
import imagePaths from "../../constants/imagePaths";
import routes from "../../navigation/routes";
import { getFollowUp, getQuickDoctor } from "../../service/ConsultationService";
import { AuthContext } from "../../context/AuthContext";
import { verticalScale } from "../../constants/metrics";

const HomeScreen = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);
  const [data, setData] = useState(null);
  const { patientInfo } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getFollow();
    setRefreshing(false);
  }, []);

  const getFollow = async () => {
    try{
      const res = await getFollowUp(patientInfo.patientId);
    setData(res);
    }
    catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // getFollowUp();
  const createAlert = () =>
    Alert.alert("No Doctor is available currently", "Please try later", [
      { text: "OK" },
    ]);

  useEffect(() => {
    getFollow();
  }, []);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalStyle}
        >
          <SpecializationsModal navigation={navigation} hideModal={hideModal} />
        </Modal>
      </Portal>
      <Header />
      <View style={{ padding: 5 }}>
        <View style={styles.squareTiles}>
          <SquareTile
            imgSrc={imagePaths.quick_consultation}
            color={"#ECF9E3"}
            text={"Quick Consulatation"}
            onPress={async () => {
              const doc = await getQuickDoctor();
              if (doc) {
                navigation.navigate(routes.DOCTOR_WAITING, { doctor: doc });
              } else {
                createAlert();
              }
            }}
          />
          <SquareTile
            imgSrc={imagePaths.specialist_consultation}
            color="#F7F8FF"
            text={"Specialist Consulatation"}
            onPress={showModal}
          />
        </View>
        <View style={{ backgroundColor: "white" }}>
          <List.Section
            title="My Follow Ups"
            titleStyle={{
              fontWeight: "bold",
              fontSize: 25,
              color: "gray",
              marginTop: 25,
              marginLeft: 10,
            }}
          />
          {isLoading ? (
            <ActivityIndicator />
          ) : data ? (
            <View>
              <FlatList data={data}
              horizontal={true}
              keyExtractor={( item ) => item.consultationId}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              renderItem={({ item }) => (
                <View style={styles.box}>
                  <List.Item
                    descriptionStyle={{
                      color: "gray",
                      fontSize: 14,
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
                        Dr. {`${item.fname} ${item.lname}`}
                      </Text>
                    }
                    {...console.log("Data: ",data)}
                    description={`On ${item.followUpDate.split("T")[0]}`}
                    left={(props) => (
                      <Image
                        source={require(`../../../assets/general-doc.png`)}
                        style={{ width: 55, height: 55 }}
                      />
                    )}
                  />
                </View>
              )}
              />
            </View>
          ): <View style={styles.box}><Text style={{color: "gray", fontSize:20, fontWeight:"500"}}>You have no follow up consultations</Text></View> }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  modalStyle: {
    backgroundColor: "white",
    padding: 20,
    height: "50%",
    margin: 20,
    borderRadius: 20,
  },
  squareTiles: {
    flexDirection: "row",
    height: verticalScale(200),
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
  },
  card: {
    backgroundColor: "#F7F8FF",
    margin: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    flex: 1,
    flexDirection: "row",
  },
  box: {
    height: verticalScale(130),
    padding: 15,
    marginHorizontal: 10,
    alignItems:"center",
    justifyContent: "center",
    marginVertical: 0,
    borderRadius: 10,
    backgroundColor: "#F7F8FF",
  },
});

export default HomeScreen;
