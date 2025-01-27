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
    <View style={styles.container}>
      <Categories onCategoryChange={setActiveCategory} activeCategory={activeCategory} />



      {activeCategory === 'Personajes' && (
        <>
          <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
          <ScrollView style={styles.scrollContent}>
            {characters.map((character, index) => (
              <ItemCategories key={index} nameItem={character.name} descriptionItem={character.speciesName} data={character} />
            ))}
          </ScrollView>

        </>
      )}
      {activeCategory === 'Planetas' && (
        <>
          <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
          <ScrollView style={styles.scrollContent}>
            {planets.map((planet, index) => (
              <ItemCategories key={index} nameItem={planet.name} descriptionItem={planet.climate} data={planet} />
            ))}
          </ScrollView>

        </>
      )}
      {activeCategory === 'Peliculas' && (
        <>
          <ListItemCategories totalPages={totalPages} onPageChange={setCurrentPage} />
          <ScrollView style={styles.scrollContent}>
            {films.map((film, index) => (
              <ItemCategories key={index} nameItem={`Star wars: ${film.title}`} descriptionItem={`Productor: ${film.producer}`} data={film} />
            ))}
          </ScrollView>

        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  linkText: {
    color: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    // borderWidth:2,
    // borderColor: 'red',
    marginBottom: 70,
  },
  scrollContent: {

  },

});