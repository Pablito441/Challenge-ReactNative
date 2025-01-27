type Film = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[]; // Array de URLs de personajes
  planets: string[]; // Array de URLs de planetas
  starships: string[]; // Array de URLs de naves espaciales
  vehicles: string[]; // Array de URLs de vehículos
  species: string[]; // Array de URLs de especies
  created: string;
  edited: string;
  url: string;
}; 

export default Film;