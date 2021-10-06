import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function Details({ navigation, route }) {
  const [mainImage, setMainImage] = useState(
    route.params.data.sprites.front_default
  );
  const name = route.params.data.forms[0].name;
  const images = Object.keys(route.params.data.sprites)
    .map((imageKey) =>
      typeof route.params.data.sprites[imageKey] === "string"
        ? route.params.data.sprites[imageKey]
        : null
    )
    .filter((image) => !!image);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={navigation.goBack}>
          <Feather name="arrow-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image style={styles.image} source={{ uri: mainImage }} />
      <FlatList
        horizontal
        data={images}
        renderItem={({ item: uri }) => (
          <TouchableOpacity
            onPress={() => {
              setMainImage(uri);
            }}
          >
            <Image source={{ uri }} style={styles.tiny} key={uri} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aeaeae",
  },
  header: {
    marginTop: 30,
    height: 100,
    alignItems: "center",
    flexDirection: "row",
  },
  arrow: {
    height: 100,
    justifyContent: "center",
    padding: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  image: {
    height: 400,
    margin: 10,
  },
  tiny: {
    height: 100,
    width: 100,
  },
  list: {
    height: 100,
  },
});
