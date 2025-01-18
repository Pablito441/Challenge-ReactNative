import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useRouter } from 'expo-router';
import { Character } from '../types/Character';
import { Film } from '../types/Film';
import { Planet } from '../types/Planet';

// Define la interfaz para las props
interface ItemCategoriesProps {
  nameItem: string;
  descriptionItem: string;
  data: Character | Film | Planet ;
}

// Función para generar un color aleatorio
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const ItemCategories: React.FC<ItemCategoriesProps> = ({ nameItem, descriptionItem, data }) => {
  const router = useRouter();

  // Obtener la inicial del nombre y la especie
  const nameInitial = nameItem.charAt(0).toUpperCase();
  const descriptionInitial = descriptionItem.charAt(0).toUpperCase();
  const profileText = `${nameInitial}${descriptionInitial}`;

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerImg}>
        <View style={[styles.containerImgCircule, { backgroundColor: getRandomColor() }]}>
          <Text style={styles.containerImgText}>{profileText}</Text>
        </View>
      </View>

      <View style={styles.containerText}>
        <Text style={styles.textName}>{nameItem}</Text>
        <Text style={styles.textSpecie}>{descriptionItem}</Text>
      </View>

      <View style={styles.containerIcon}>
        <TouchableOpacity onPress={() => router.push({ pathname: '/screens/modalCategories', params: { data: JSON.stringify(data) } })}>
          <Ionicons name="information-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    width: '100%',
    height: '6%',
    marginVertical: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  containerImg: {
    marginRight: 10,
  },
  containerImgCircule: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerImgText: {
    color: '#fff',
    fontSize: 16,
  },
  containerText: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  containerIcon: {
    marginLeft: 10,
  },
  textName: {
    color: '#fff',
    fontSize: 16,
  },
  textSpecie: {
    color: '#7E7E7E',
    fontSize: 12,
  },
});
