import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import { List, Button, FAB, Appbar } from "react-native-paper";
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
  const [isLoading, setLoading] = useState(true);
  //onMount load all the documents
  useEffect(() => {
    getDocuments();
    docsForConsultation();
  }, []);

  async function getDocuments() {
    data = await getAllDocuments();
    setDocs(data);
    setLoading(false);
  }

  async function docUpload() {
    setLoading(true);
    await uploadDocument();
    await getDocuments();
  }

  async function removeDoc(docId) {
    setLoading(true);
    await removeDocument(docId);
    await getDocuments();
  }

  async function downloadDoc(docId) {
    setLoading(true);
    await downloadDocument(item.id);
    await getDocuments();
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Appbar.Header style={{ backgroundColor: "#F5ECFF" }}>
            <Appbar.Content title="Documents" titleStyle={{ color: "black" }} />
          </Appbar.Header>
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
      )}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          docUpload();
        }}
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
//make this component available to the app
export default DocumentScreen;
