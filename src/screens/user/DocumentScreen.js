import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import { List, Button } from "react-native-paper";
import React, { useState, useEffect } from "react";
import {
  uploadDocument,
  getAllDocuments,
  removeDocument,
  downloadDocument,
  docsForConsultation,
} from "../../service/DocumentService";

// create a component
const DocumentScreen = () => {
  const [docs, setDocs] = useState([]);
  //onMount load all the documents
  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    data = await getAllDocuments();
    setDocs(data);
    console.log(docs);
  }

  async function removeDoc(docId) {
    await removeDocument(docId);
    await getDocuments();
  }

  async function downloadDoc(docId) {
    await downloadDocument(item.id);
    await getDocuments();
  }
  return (
    <View>
      <Text style={styles.text}>Documents</Text>
      <FlatList
        data={docs}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <List.Item
              title={`${item.name}`}
              titleStyle={{ color: "black" }}
              right={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      icon="download"
                      onPress={() => {
                        downloadDocument(item.id);
                      }}
                    ></Button>
                    <Button
                      icon="delete"
                      onPress={() => {
                        removeDoc(item.id);
                      }}
                    ></Button>
                  </View>
                );
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  box: {
    height: 100,
    width: "90%",
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#F5ECFF",
  },
});
//make this component available to the app
export default DocumentScreen;
