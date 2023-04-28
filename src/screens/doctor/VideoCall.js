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
  var finish = false;
  const connectionData = {
    appId: "5e2ee6c6fc13459caa99cb8c234d42e0",
    channel: doctor.channel_name,
    token: doctor.token,
  };

  const callbacks = {
    EndCall: () => {
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

    return () => {
      removePatientFromQueue(doctor.id, patientId);
      setBottomBarVisible(true);
      unsubscribe();
      //subscription.remove();
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

export default VideoCall;
