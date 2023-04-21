import React, { useState, useContext, useEffect, useRef } from "react";
import AgoraUIKit from "agora-rn-uikit";
import {
  AppState,
  Alert,
  Text,
  View,
  Portal,
  Modal,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { ConsultationDocsFAB } from "../../components/ConsultationDocsFAB";
import routes from "../../navigation/routes";

import {
  getPatientIndexFromQueue,
  removePatientFromQueue,
} from "../../service/DoctorService";

const VideoCall = ({ navigation, route }) => {
  const { setBottomBarVisible } = useContext(AuthContext);
  const { doctor, consultationId, patientId } = route.params;
  const [index, setIndex] = useState(null);
  const [accept, setAccept] = useState(null);
  let interval;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  var finish = false;
  const connectionData = {
    appId: "5e2ee6c6fc13459caa99cb8c234d42e0",
    channel: doctor.channel_name,
    token: doctor.token,
  };

  const callbacks = {
    EndCall: () => {
      console.log("END CALL");
      finish = true;
      removePatientFromQueue(doctor.id, patientId);
      navigation.replace(routes.HOME);
    },
  };

  const myalert = (e, unsubscribe) => {
    if (finish) {
      return;
    }
    e.preventDefault();
    Alert.alert(
      "Are you sure you want to exit the Consultation",
      "You will have to rejoin the queue if you leave this screen",
      [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Leave",
          style: "destructive",

          onPress: () => {
            unsubscribe();
            console.log(e.data);
            navigation.reset({
              index: 0,
              routes: [{ name: routes.DOCTOR_REVIEW, params: { doctor } }],
            });
          },
        },
      ]
    );
  };

  useEffect(() => {
    if (finish) {
      return;
    }
    setBottomBarVisible(false);

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      myalert(e, unsubscribe);
    });

    interval = setInterval(async () => {
      const res = await getPatientIndexFromQueue(
        doctor.id,
        patientId,
        setIndex,
        setAccept
      );
      if (res.index == -1) {
        finish = true;
        removePatientFromQueue(doctor.id, patientId);
        navigation.replace(routes.DOCTOR_REVIEW, { doctor });
      }
    }, 2000);

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      removePatientFromQueue(doctor.id, patientId);
      setBottomBarVisible(true);
      unsubscribe();
      subscription.remove();
      console.log("Interval Cleared");
      clearInterval(interval);
    };
  }, [navigation, finish]);

  return (
    <View style={{ flex: 1 }}>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      <ConsultationDocsFAB consultationId={consultationId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    fontSize: 25,
  },
  squareTiles: {
    flexDirection: "row",
    width: "100%",
    height: "30%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  containerStyle: {
    alignSelf: "center",
    backgroundColor: "white",
    padding: 20,
    height: "30%",
    width: "75%",
    margin: 10,
  },
});

export default VideoCall;
