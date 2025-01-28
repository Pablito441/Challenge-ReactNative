import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { fetchNameUrl, fetchTitleNameUrl } from '../services/urlServices';
import Character from '@/types/Character';
import Film from '@/types/Film';
import Planet from '@/types/Planet';

export default function ModalCategories() {
    const params = useLocalSearchParams();
    const data = params?.data ? JSON.parse(params.data as string) : null;
    const [homeworldName, setHomeworldName] = useState<string | null>(null);
    const [films, setFilms] = useState<string[]>([]);
    const [species, setSpecies] = useState<string[]>([]);
    const [vehicles, setVehicles] = useState<string[] >([]);
    const [starships, setStarships] = useState<string[] >([]);
    const [characters, setCharacters] = useState<string[] >([]);
    const [planets, setPlanets] = useState<string[] >([]);
    const [residents, setResidents] = useState<string[] >([]);

    useEffect(() => {
        const fetchData = async () => {
            if (data && 'speciesName' in data) {
                const character = data as Character;

                // Fetch homeworld name
                if (character.homeworld) {
                    try {
                        const name = await fetchNameUrl(character.homeworld);
                        setHomeworldName(name);
                    } catch (error) {
                        console.error('Error fetching homeworld name:', error);
                    }
                }
                try {
                    const filmNames = await Promise.all(
                        character.films.map(async (Url) => {
                            return await fetchTitleNameUrl(Url);
                        })
                    );
                    setFilms(filmNames);
                } catch (error) {
                    console.error('Error fetching film names:', error);
                }
                try {
                    const speciesNames = await Promise.all(
                        character.species.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setSpecies(speciesNames);
                } catch (error) {
                    console.error('Error fetching Species names:', error);
                }
                try {
                    const vehiclesNames = await Promise.all(
                        character.vehicles.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setVehicles(vehiclesNames);
                } catch (error) {
                    console.error('Error fetching Vehicles names:', error);
                }
                try {
                    const starshipsNames = await Promise.all(
                        character.starships.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setStarships(starshipsNames);
                } catch (error) {
                    console.error('Error fetching Starships names:', error);
                }

            }else if('episode_id' in data){
                const film = data as Film;
                try {
                    const charactersNames = await Promise.all(
                        film.characters.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setCharacters(charactersNames);
                } catch (error) {
                    console.error('Error fetching Characters names:', error);
                }
                try {
                    const planetsNames = await Promise.all(
                        film.planets.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setPlanets(planetsNames);
                } catch (error) {
                    console.error('Error fetching Planets names:', error);
                }
                try {
                    const speciesNames = await Promise.all(
                        film.species.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setSpecies(speciesNames);
                } catch (error) {
                    console.error('Error fetching Species names:', error);
                }
                try {
                    const vehiclesNames = await Promise.all(
                        film.vehicles.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setVehicles(vehiclesNames);
                } catch (error) {
                    console.error('Error fetching Vehicles names:', error);
                }
                try {
                    const starshipsNames = await Promise.all(
                        film.starships.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setStarships(starshipsNames);
                } catch (error) {
                    console.error('Error fetching Starships names:', error);
                }
            }else if('rotation_period' in data){
                const planets = data as Planet;
                try {
                    const filmNames = await Promise.all(
                        planets.films.map(async (Url) => {
                            return await fetchTitleNameUrl(Url);
                        })
                    );
                    setFilms(filmNames);
                } catch (error) {
                    console.error('Error fetching film names:', error);
                }
                try {
                    const residentsNames = await Promise.all(
                        planets.residents.map(async (Url) => {
                            return await fetchNameUrl(Url);
                        })
                    );
                    setResidents(residentsNames);
                } catch (error) {
                    console.error('Error fetching Residents names:', error);
                }
            }
        };

        fetchData();
    }, [data]);
    
    const renderDetails = () => {
        if (!data) return <Text style={s.linkText}>No hay datos disponibles</Text>;

        if ('speciesName' in data) {
            const character = data as Character;
            return (
                <>
                    <Text style={s.title}>{character.name}</Text>
                    <Text style={s.detail}>Altura: {character.height}</Text>
                    <Text style={s.detail}>Peso: {character.mass}</Text>
                    <Text style={s.detail}>Color de cabello: {character.hair_color}</Text>
                    <Text style={s.detail}>Color de piel: {character.skin_color}</Text>
                    <Text style={s.detail}>Color de ojos: {character.eye_color}</Text>
                    <Text style={s.detail}>Año de nacimiento: {character.birth_year}</Text>
                    <Text style={s.detail}>Género: {character.gender}</Text>
                    <Text style={s.detail}>Planeta Natal: {homeworldName || 'Cargando...'}</Text>
                    
                    <Text style={s.subTitle}>Películas en las que aparece:</Text>
                    <View style={s.listContainer}>
                        {films.map((filmName, index) => (
                            <Text key={index} style={s.listItem}>- Star Wars: {filmName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Especie/s:</Text>
                    <View style={s.listContainer}>
                        {species.map((speciesName, index) => (
                            <Text key={index} style={s.listItem}>- {speciesName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Vehículos:</Text>
                    <View style={s.listContainer}>
                        {vehicles.map((vehicleName, index) => (
                            <Text key={index} style={s.listItem}>- {vehicleName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Naves Espaciales:</Text>
                    <View style={s.listContainer}>
                        {starships.map((starshipsName, index) => (
                            <Text key={index} style={s.listItem}>- {starshipsName}</Text>
                        ))}
                    </View>
                </>
            );
        } else if ('episode_id' in data) {
            const film = data as Film;
            return (
                <>
                    <Text style={s.title}>{film.title}</Text>
                    <Text style={s.detail}>Director: {film.director}</Text>
                    <Text style={s.detail}>Productor: {film.producer}</Text>
                    <Text style={s.detail}>Fecha de lanzamiento: {film.release_date}</Text>
                    <Text style={s.detail}>Episodio: {film.episode_id}</Text>
                    <Text style={s.detail}>Sinopsis: {film.opening_crawl}</Text>
                    
                    <Text style={s.subTitle}>Personajes:</Text>
                    <View style={s.listContainer}>
                        {characters.map((charactersName, index) => (
                            <Text key={index} style={s.listItem}>- {charactersName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Planetas:</Text>
                    <View style={s.listContainer}>
                        {planets.map((planetsName, index) => (
                            <Text key={index} style={s.listItem}>- {planetsName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Naves Espaciales:</Text>
                    <View style={s.listContainer}>
                        {starships.map((starshipsName, index) => (
                            <Text key={index} style={s.listItem}>- {starshipsName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Vehículos:</Text>
                    <View style={s.listContainer}>
                        {vehicles.map((vehicleName, index) => (
                            <Text key={index} style={s.listItem}>- {vehicleName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Especies:</Text>
                    <View style={s.listContainer}>
                        {species.map((speciesName, index) => (
                            <Text key={index} style={s.listItem}>- {speciesName}</Text>
                        ))}
                    </View>
                </>
            );
        } else if ('climate' in data) {
            const planet = data as Planet;
            return (
                <>
                    <Text style={s.title}>{planet.name}</Text>
                    <Text style={s.detail}>Periodo Rotacional: {planet.rotation_period}</Text>
                    <Text style={s.detail}>Periodo Orbital: {planet.orbital_period}</Text>
                    <Text style={s.detail}>Diámetro: {planet.diameter}</Text>
                    <Text style={s.detail}>Clima: {planet.climate}</Text>
                    <Text style={s.detail}>Gravedad: {planet.gravity}</Text>
                    <Text style={s.detail}>Terreno: {planet.terrain}</Text>
                    <Text style={s.detail}>Agua Superficial: {planet.surface_water}</Text>
                    <Text style={s.detail}>Población: {planet.population}</Text>
                    
                    <Text style={s.subTitle}>Residentes:</Text>
                    <View style={s.listContainer}>
                        {residents.map((residentsName, index) => (
                            <Text key={index} style={s.listItem}>- {residentsName}</Text>
                        ))}
                    </View>
                    
                    <Text style={s.subTitle}>Películas en las que aparece:</Text>
                    <View style={s.listContainer}>
                        {films.map((filmsName, index) => (
                            <Text key={index} style={s.listItem}>- Star Wars: {filmsName}</Text>
                        ))}
                    </View>
                </>
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={s.containerMain}>
            {renderDetails()}
        </ScrollView>
    );
}

const s = StyleSheet.create({
    containerMain: {
        flexGrow: 1,
        backgroundColor: '#0A0A0A',
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#988EE4',
        marginBottom: 10,
    },
    detail: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 5,
    },
    linkText: {
        color: '#ffffff',
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 15,
        marginBottom: 5,
    },
    listContainer: {
        marginBottom: 10,
        paddingLeft: 10,
    },
    listItem: {
        fontSize: 16,
        color: '#ffffff',
        marginBottom: 3,
    },
});