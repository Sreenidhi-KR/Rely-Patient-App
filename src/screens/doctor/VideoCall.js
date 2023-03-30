import React, { useState } from "react";
import AgoraUIKit from "agora-rn-uikit";
import { Text, View } from "react-native";

const VideoCall = ({ route }) => {
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

  return videoCall ? (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={callbacks} />
  ) : (
    <Text setVideoCall={setVideoCall} onPress={() => setVideoCall(true)}>
      Start Call
    </Text>
  );
};

export default VideoCall;
