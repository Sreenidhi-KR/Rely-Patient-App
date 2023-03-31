import React, { useState, useContext, useEffect } from "react";
import AgoraUIKit from "agora-rn-uikit";
import { Text, View } from "react-native";
import { ConsultationDocs } from "../../components/user/consultationDocumentsFAB";
import { AuthContext } from "../../context/AuthContext";

const VideoCall = ({ route }) => {
  const { setBottomBarVisible } = useContext(AuthContext);
  const { doctor } = route.params;
  const [videoCall, setVideoCall] = useState(true);
  console.log(doctor);
  const connectionData = {
    appId: "5e2ee6c6fc13459caa99cb8c234d42e0",
    channel: doctor.channel_name,
    token: doctor.token,
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
  useEffect(() => {
    setBottomBarVisible(false);

    return () => {
      setBottomBarVisible(true);
    };
  }, []);

  return videoCall ? (
    <View style={{ flex: 1 }}>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
      <ConsultationDocs />
    </View>
  ) : (
    <Text setVideoCall={setVideoCall} onPress={() => setVideoCall(true)}>
      Start Call
    </Text>
  );
};

export default VideoCall;
