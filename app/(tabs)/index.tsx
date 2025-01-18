import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Categories } from '../components/Categories';
import { ListItemCategories } from '../components/ListItemCategories';
import { ItemCategories } from '../components/ItemCategories';
import { fetchPeopleDataByPage, fetchSpeciesName } from '../services/peopleService';
//url base
import API_URL from '@/config';
//types
import { Character } from '../types/Character';
import { Planet } from '../types/Planet';
import { Film } from '../types/Film';
import { fetchTotalPages } from '../services/pagesService';
import { fetchPlanetsDataByPage } from '../services/planetsService';
import { fetchFilmsDataByPage } from '../services/filmService';
import { Link } from 'expo-router';

export default function Home() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [films, setFilms] = useState<Film[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [activeCategory, setActiveCategory] = useState<string>('Personajes');



  useEffect(() => {

    if (activeCategory === 'Personajes') {

      const getDataCharacters = async () => {
        try {
          const people = await fetchPeopleDataByPage(currentPage);
          const peopleWithSpeciesNames = await Promise.all(
            people.map(async (person: Character) => {
              const speciesName = person.species.length > 0
                ? await fetchSpeciesName(person.species[0])
                : 'Unknown';
              return { ...person, speciesName };
            })
          );
          setCharacters(peopleWithSpeciesNames);
          //obtener el numero de paginación maximo
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      getDataCharacters();

    } else if (activeCategory === "Planetas") {

      const getDataPlanets = async () => {
        try {
          const planetsData = await fetchPlanetsDataByPage(currentPage);
          setPlanets(planetsData);
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getDataPlanets();
    } else if (activeCategory === "Peliculas") {

      const getDataFilms = async () => {
        try {
          const filmsData = await fetchFilmsDataByPage(currentPage);
          setFilms(filmsData);
          const pages = await fetchTotalPages(activeCategory);
          setTotalPages(pages);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      getDataFilms();
    }
  }, [currentPage, activeCategory]);

  return (

      <ScrollView style={styles.container}>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#fff"
          />
        </View>

        <Categories onCategoryChange={setActiveCategory} activeCategory={activeCategory} />
        {activeCategory === 'Personajes' && (
          <>
            <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
            {characters.map((character, index) => (
              <ItemCategories key={index} nameItem={character.name} descriptionItem={character.speciesName} data={character}/>
            ))}
          </>
        )}
        {activeCategory === 'Planetas' && (
          <>
            <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
            {planets.map((planet, index) => (
              <ItemCategories key={index} nameItem={planet.name} descriptionItem={planet.climate} data={planet}/>
            ))}
          </>
        )}
        {activeCategory === 'Peliculas' && (
          <>
            <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
            {films.map((film, index) => (
              <ItemCategories key={index} nameItem={`Star wars: ${film.title}`} descriptionItem={`Productor: ${film.producer}`} data={film}/>
            ))}
          </>
        )}

      </ScrollView>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    marginBottom: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: '#363636',
    paddingVertical: 1,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 7,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
});