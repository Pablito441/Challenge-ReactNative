import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Categories: React.FC<{ onCategoryChange: (category: string) => void, activeCategory: string }> = ({ onCategoryChange, activeCategory }) => {
  const categories = ['Personajes', 'Planetas', 'Peliculas'];

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryChange(category)}
          style={[
            styles.categoryButton,
            activeCategory === category && styles.activeCategoryButton,
          ]}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  activeCategoryButton: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    color: '#fff',
  },
});