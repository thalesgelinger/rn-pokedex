import React from "react";
import { Image, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PokeCard({ name, image, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#333333",
    position: "relative",
    borderWidth: 1.5,
    overflow: "hidden",
  },
  image: {
    height: 100,
    width: 100,
  },
  name: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "#333333",
    color: "#FFFFFF",
  },
});
