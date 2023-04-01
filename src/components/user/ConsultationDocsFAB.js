import { ActivityIndicator, StyleSheet, FlatList, View } from "react-native";
import {
  List,
  Button,
  FAB,
  Appbar,
  Modal,
  Portal,
  Text,
  button,
  Provider,
} from "react-native-paper";
import {
  uploadDocument,
  docsForConsultation,
  addDocToConsultation,
  removeDocFromConsultation,
} from "../../service/DocumentService";
import React, { useState, useEffect } from "react";
const ConsultationDocsFAB = ({ consultationId }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inConsultation, setInConsultation] = useState([]);
  const [canBeAdded, setCanBeAdded] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getConsultationDocuments(consultationId);
  }, []);

  async function getConsultationDocuments(consultationId) {
    setLoading(true);
    let json = await docsForConsultation(consultationId);
    setInConsultation(json[0]);
    setCanBeAdded(json[1]);
    setLoading(false);
  }

  //After adding docs to consultaton we should reload the files which are in consultation and not in consultaton .
  async function addDocToConsul(docId) {
    setLoading(true);
    await addDocToConsultation(docId, consultationId);
    await getConsultationDocuments(consultationId);
    setLoading(false);
  }

  //After removeing docs from consultation we shoudl reload the files
  async function removeDocFromConsul(docId) {
    setLoading(true);
    await removeDocFromConsultation(docId, consultationId);
    await getConsultationDocuments(consultationId);
    setLoading(false);
  }

  //After upload we should also reolad all the docs in the consultation and not in consultation also
  async function uploadDoc() {
    setLoading(true);
    await uploadDocument();
    await getConsultationDocuments(consultationId);
    setLoading(false);
  }
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  return (
    <View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          showModal();
        }}
      />
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Button
                icon="upload"
                onPress={() => {
                  uploadDoc();
                  setLoading(true);
                }}
              >
                Upload New Document
              </Button>
              {/* View all the documents that are in the consultation */}
              <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.Content
                  title="Documents in Consultation"
                  titleStyle={{ color: "black" }}
                />
              </Appbar.Header>
              <FlatList
                data={inConsultation}
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
                              icon="delete"
                              onPress={() => {
                                removeDocFromConsul(item.id);
                              }}
                            >
                              Remove
                            </Button>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
              />
              {/* View all the documents that are not yet in the consultation */}
              <Appbar.Header style={{ backgroundColor: "white" }}>
                <Appbar.Content
                  title="Other documents"
                  titleStyle={{ color: "black" }}
                />
              </Appbar.Header>
              <FlatList
                data={canBeAdded}
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
                              icon="plus"
                              onPress={() => {
                                // setLoading(true);
                                // addDocToConsultation(item.id);
                                addDocToConsul(item.id);
                              }}
                            >
                              Add
                            </Button>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
              />
            </View>
          )}
        </Modal>
      </Portal>
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
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
  },
});

export { ConsultationDocsFAB };
