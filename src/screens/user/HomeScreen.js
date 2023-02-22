import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("https://reactnative.dev/movies.json");
      const json = await response.json();
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <Text>
              {item.title}, {item.releaseYear}
            </Text>
          )}
        />
      )}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     height: "16%",
//     margin: "10%",
//     borderRadius: 15,
//     width: "80%",
//     backgroundColor: "#41D5BA",
//     opacity: 0.5,
//   },
//   profile: {
//     height: "40%",
//     borderRadius: 150 / 2,
//     width: "20%",
//     backgroundColor: "black",
//     opacity: 0.5,
//   },
// });

export default HomeScreen;
