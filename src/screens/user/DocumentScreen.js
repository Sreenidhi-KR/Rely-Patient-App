import {
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
  View,
} from "react-native";
import { List, Button, FAB, Appbar } from "react-native-paper";
import React, { useState, useEffect, useContext } from "react";
import {
  uploadDocument,
  getAllDocumentsList,
  removeDocument,
  downloadDocument,
} from "../../service/DocumentService";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

// create a component
const DocumentScreen = () => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { patientInfo } = useContext(AuthContext);
  const patientId = patientInfo.patientId;

  //onMount load all the documents
  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    data = await getAllDocumentsList(patientId);
    setDocs(data);
    setLoading(false);
  }

  async function docUpload() {
    setLoading(true);
    await uploadDocument(patientId);
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
    <>
      <View style={styles.container}>
        <Header />
        <Spinner visible={isLoading} />
        <View style={styles.wrapper}>
          <List.Section
            title="Documents"
            titleStyle={{ fontWeight: "bold", fontSize: 25, color: "grey" }}
          ></List.Section>
          <FlatList
            scrollEnabled
            showsVerticalScrollIndicator
            data={docs}
            centerContent
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
                          justifyContent: "flex-start",
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Button
                            textColor="gray"
                            icon="download"
                            onPress={() => {
                              downloadDocument(item.id);
                            }}
                          ></Button>
                          <Button
                            textColor="gray"
                            icon="delete"
                            onPress={() => {
                              removeDoc(item.id);
                            }}
                          ></Button>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          />
        </View>
        <FAB
          icon="plus"
          label="Add Document"
          size="small"
          variant="primary"
          style={styles.fab}
          onPress={() => {
            docUpload();
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#F3EDF5",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#E8DDF8",
  },
});
//make this component available to the app
export default DocumentScreen;
