import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import PokeCard from "./../../components/poke-card";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      const {
        data: { results },
      } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${
          pokemons.length + 20
        }&offset=${pokemons.length}`
      );

      const pokemonsAllData = await Promise.all(
        results.map(({ url }) => axios.get(url))
      );

      const fetchedPokemons = results.map(({ name }, i) => ({
        name,
        image: pokemonsAllData[i].data.sprites.front_default,
        data: pokemonsAllData[i].data,
      }));

      setPokemons([...pokemons, ...fetchedPokemons]);
    } catch (e) {
      console.error({ e });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um pikachu"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={30} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={pokemons}
        renderItem={({ item: { name, image, data } }) => (
          <PokeCard
            name={name}
            image={image}
            key={name}
            onPress={() => {
              navigation.navigate("Details", { data });
            }}
          />
        )}
        numColumns={3}
        keyExtractor={(item) => item.name}
        onEndReachedThreshold={0.7}
        onEndReached={fetchPokemons}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aeaeae",
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    height: 40,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
  },
  searchButton: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingRight: 0,
  },
  list: {
    justifyContent: "space-between",
    marginTop: 30,
    marginHorizontal: 20,
  },
});
