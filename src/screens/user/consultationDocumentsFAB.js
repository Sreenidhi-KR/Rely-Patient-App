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
} from "../../service/DocumentService";
import React, { useState, useEffect } from "react";
const ConsultationDocs = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [inConsultation, setInConsultation] = useState([]);
  const [canBeAdded, setCanBeAdded] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    consultationDocs();
  }, []);

  async function consultationDocs() {
    let json = await docsForConsultation();
    setInConsultation(json[0]);
    setCanBeAdded(json[1]);
    setLoading(false);
  }

  //After upload we should also reolad all the docs in the consultation and not in consultation also
  async function uploadDoc() {
    await uploadDocument();
    await consultationDocs();
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
            <Button
              icon="upload"
              onPress={() => {
                uploadDoc();
                setLoading(true);
              }}
            >
              Upload New Document
            </Button>
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

export { ConsultationDocs };
