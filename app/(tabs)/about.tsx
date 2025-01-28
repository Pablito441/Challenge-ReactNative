import { View, StyleSheet, Text, TouchableOpacity, Linking } from "react-native";
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function About() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This Application</Text>
      <Text style={styles.description}>
        This application was developed by Pablo Caceres. I am passionate about creating intuitive and user-friendly applications that enhance the user experience. If you encounter any issues or have suggestions for improvement, please feel free to reach out via email at pablocaceres441@gmail.com. Your feedback is invaluable and helps me to continuously improve my work. Thank you for using this application!
      </Text>
      <Text style={styles.version}>Version: 1.0.0</Text>
      <Text style={styles.releaseDate}>Release Date: January 1, 2023</Text>
      <Text style={styles.techUsed}>Technologies Used: React Native, JavaScript</Text>
      <Text style={styles.acknowledgments}>Special thanks to all contributors and resources that made this project possible.</Text>
      <Text style={styles.socialLinks}>Follow me on social media:</Text>
      <View style={styles.socialLinkContainer}>
        <TouchableOpacity onPress={() => openLink('https://www.instagram.com/bliuskii/')}>
          <Icon name="logo-instagram" size={30} color="#ffd33d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.youtube.com/@itsblittoo')}>
          <Icon name="logo-youtube" size={30} color="#ffd33d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink('https://www.tiktok.com/@itsblittoo')}>
          <Icon name="logo-tiktok" size={30} color="#ffd33d" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd33d',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  version: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  techUsed: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  acknowledgments: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  socialLinks: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 5,
  },
  socialLinkContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 75,
    paddingVertical: 20,
  },
});
