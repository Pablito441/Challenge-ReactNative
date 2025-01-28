import { Stack, Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';

import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function TabLayout() {
  //cambia el color de la barra de navecacion solo en android
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#0A0A0A');
    }
  }, []);


  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#0A0A0A" //bara de notificaciones, hora etc.
        translucent={false}
        animated={true}
      />
      <Stack.Screen 
        name="modalCategories" 
        options={{ 
          title: 'Modal Categories',
          headerShown: false,
          // headerStyle: { backgroundColor: '#0A0A0A' },
          // headerTintColor: '#ffffff',
          // headerTitleStyle: {
          //   fontSize: 20,
          //   fontWeight: 'bold',
          // },
          // headerBackTitle: '',
          // headerBackButtonMenuEnabled: true,
        }} 
      />
      
      <Tabs
        screenOptions={{
          
          headerStyle: { 
            backgroundColor: '#0A0A0A', 
            // borderBottomWidth: 2,
            // borderBottomColor: 'red',
            // borderTopWidth: 2,
            // borderTopColor: 'red',
            height: 50,
          },
          headerShown: true,
          
          headerTintColor: '#fff', // El color de la palabras del header
          headerTitleStyle: {
            marginLeft: '5%', 
            fontSize: 24, 
          },
          
          tabBarActiveTintColor: '#ffd33d', // el color del icon la pestaña de navegacion seleccionada en la barra inferior
          tabBarStyle: { // barra inferior
            backgroundColor: '#0A0A0A',
            height: 40,
            position: 'absolute', // Asegúrate de que la barra esté en la parte inferior
            bottom: 0,
            left: 0,
            right: 0,
            borderTopWidth: 0.25,
            borderTopColor: '#1B1B1B',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Swapi App',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={26} />
            ),
            tabBarLabel: '',
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: 'About the Application',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={26} />
            ),
            tabBarLabel: '',
          }}
        />
      </Tabs>
    </>
  );
}

