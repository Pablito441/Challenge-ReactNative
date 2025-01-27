// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
// import { fetchPeopleDataByPage } from '../services/peopleService';
// import { Character } from '../types/Character';
// import { ItemCategories } from '../components/ItemCategories';

// export const Search = () => {
//   const [search, setSearch] = useState('');
//   const [characters, setCharacters] = useState<Character[]>([]);
//   const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

//   useEffect(() => {
//     const fetchAllCharacters = async () => {
//       let allCharacters: Character[] = [];
//       let page = 1;
//       let hasMore = true;

//       while (hasMore) {
//         const results = await fetchPeopleDataByPage(page);
//         allCharacters = [...allCharacters, ...results];
//         page++;
//         hasMore = results.length > 0;
//       }

//       setCharacters(allCharacters);
//     };

//     fetchAllCharacters();
//   }, []);

//   useEffect(() => {
//     const result = characters.filter((character) =>
//       character.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCharacters(result);
//   }, [search, characters]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Buscar personaje"
//         value={search}
//         onChangeText={setSearch}
//       />
//       <ScrollView>
//         {filteredCharacters.map((character) => (
//           <ItemCategories
//             key={character.url}
//             nameItem={character.name}
//             descriptionItem={character.speciesName || 'Desconocido'}
//             data={character}
//           />
//         ))}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
// });




// import Ionicons from "@expo/vector-icons/Ionicons";
// import { Text, View, StyleSheet, TextInput } from "react-native";


// export default function Search() {

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search"
//           placeholderTextColor="#fff"
//         />
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A0A0A',
//     marginBottom: 40,
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 25,
//     borderWidth: 1.5,
//     borderColor: '#363636',
//     paddingVertical: 1,
//     paddingHorizontal: 10,
//     width: '90%',
//     marginTop: 7,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: '#fff',
//   },

// });