import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { uploadDocument } from "../../service/DocumentService";

// create a component
const DocumentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* list all the files which are already uploded */}
      <View style={{ flex: 5, justifyContent: "flex-start" }}>
        <Text>Display all the previously uploded files</Text>
      </View>
      {/* upload new file */}
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          title="Upload Document"
          onPress={() => uploadDocument()}
        ></Button>
      </View>
    </View>
  );
};
//make this component available to the app
export default DocumentScreen;
