import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Character } from '../../types/Character';
import { Film } from '../../types/Film';
import { Planet } from '../../types/Planet';
import { fetchNameUrl, fetchTitleNameUrl } from '../services/urlServices';

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
                    <Text style={s.detail}>Películas:</Text>
                    {films.map((filmName, index) => (
                        <Text key={index} style={s.detail}> `Star Wars: {filmName}`</Text>
                    ))}
                    <Text style={s.detail}>Especies:</Text>
                    {species.map((speciesName, index)=>(
                        <Text key={index} style={s.detail}>{speciesName}</Text>
                    ))}
                    <Text style={s.detail}>Vehiculos:</Text>
                    {vehicles.map((vehicleName,index)=>(
                        <Text key={index} style={s.detail}>{vehicleName}</Text>
                    ))}
                    <Text style={s.detail}>Naves Espaciales:</Text>
                    {starships.map((starshipsName,index)=>(
                        <Text key={index} style={s.detail}>{starshipsName}</Text>
                    ))}
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
                    <Text style={s.detail}>Personajes:</Text>
                    {characters.map((charactersName,index)=>(
                        <Text key={index} style={s.detail}>{charactersName}</Text>
                    ))}
                    <Text style={s.detail}>Planetas:</Text>
                    {planets.map((planetsName,index)=>(
                        <Text key={index} style={s.detail}>{planetsName}</Text>
                    ))}
                    <Text style={s.detail}>Naves Espaciales:</Text>
                    {starships.map((starshipsName,index)=>(
                        <Text key={index} style={s.detail}>{starshipsName}</Text>
                    ))}
                    <Text style={s.detail}>Vehiculos:</Text>
                    {vehicles.map((vehicleName,index)=>(
                        <Text key={index} style={s.detail}>{vehicleName}</Text>
                    ))}
                    <Text style={s.detail}>Especies:</Text>
                    {species.map((speciesName, index)=>(
                        <Text key={index} style={s.detail}>{speciesName}</Text>
                    ))}
                    
                </>
            );
        } else if ('climate' in data) {
            const planet = data as Planet;
            return (
                <>
                    <Text style={s.title}>{planet.name}</Text>
                    <Text style={s.detail}>Periodo Rotacional: {planet.rotation_period}</Text>
                    <Text style={s.detail}>Periodo Orbital: {planet.orbital_period}</Text>
                    <Text style={s.detail}>Diametro: {planet.diameter}</Text>
                    <Text style={s.detail}>Clima: {planet.climate}</Text>
                    <Text style={s.detail}>Gravedad: {planet.gravity}</Text>
                    <Text style={s.detail}>Terreno: {planet.terrain}</Text>
                    <Text style={s.detail}>Agua Superficial: {planet.surface_water}</Text>
                    <Text style={s.detail}>Población: {planet.population}</Text>
                    <Text style={s.detail}>Residentes:</Text>
                    {residents.map((residentsName, index) => (
                        <Text key={index} style={s.detail}>{residentsName}</Text>
                    ))}
                    <Text style={s.detail}>Películas:</Text>
                    {films.map((filmsName, index) => (
                        <Text key={index} style={s.detail}> `Star Wars: {filmsName}`</Text>
                    ))}
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0A0A0A',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
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
});