import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from 'react';
import ItemCategories from "../components/ItemCategories";
import Character from "../../types/Character";
import fetchTotalPages from "../services/pagesService";
import { fetchSpeciesName, fetchPeopleDataByPage } from "../services/peopleService";

export default function Search() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const totalPages = await fetchTotalPages("Personajes");
        const allCharacters: Character[] = [];

        for (let page = 1; page <= totalPages; page++) {
          const data = await fetchPeopleDataByPage(page);
          allCharacters.push(...data);
        }

        const charactersWithSpecies = await Promise.all(allCharacters.map(async (character) => {
          const speciesNames = await Promise.all(character.species.map(speciesUrl => fetchSpeciesName(speciesUrl)));
          return { ...character, speciesName: speciesNames[0] || 'Unknown' };
        }));

        setCharacters(charactersWithSpecies);
      } catch (error) {
        console.error('Error loading characters:', error);
      }
    };

    loadCharacters();
  }, []);

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCharacters.map(character => (
          <ItemCategories 
            key={character.url} 
            nameItem={character.name} 
            descriptionItem={character.speciesName} 
            data={character} 
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    marginBottom: 70,
    alignItems: 'center',
    // borderWidth:2,
    // borderColor: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#363636',
    paddingHorizontal: 10,
    width: '95%',
    marginVertical:5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  scrollContainer: {
    width: '100%',
  },
  scrollContent: {
  },
});