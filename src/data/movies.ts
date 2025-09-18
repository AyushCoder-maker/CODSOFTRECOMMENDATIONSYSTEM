import { Movie } from '../types';

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The Shawshank Redemption',
    genre: ['Drama', 'Crime'],
    director: 'Frank Darabont',
    year: 1994,
    rating: 9.3,
    duration: 142,
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    tags: ['redemption', 'friendship', 'hope', 'prison']
  },
  {
    id: '2',
    title: 'The Godfather',
    genre: ['Crime', 'Drama'],
    director: 'Francis Ford Coppola',
    year: 1972,
    rating: 9.2,
    duration: 175,
    poster: 'https://images.pexels.com/photos/7991232/pexels-photo-7991232.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    tags: ['family', 'power', 'loyalty', 'mafia']
  },
  {
    id: '3',
    title: 'Pulp Fiction',
    genre: ['Crime', 'Drama', 'Thriller'],
    director: 'Quentin Tarantino',
    year: 1994,
    rating: 8.9,
    duration: 154,
    poster: 'https://images.pexels.com/photos/7991433/pexels-photo-7991433.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
    cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman'],
    tags: ['nonlinear', 'violence', 'dialogue', 'dark comedy']
  },
  {
    id: '4',
    title: 'Inception',
    genre: ['Action', 'Sci-Fi', 'Thriller'],
    director: 'Christopher Nolan',
    year: 2010,
    rating: 8.8,
    duration: 148,
    poster: 'https://images.pexels.com/photos/7991641/pexels-photo-7991641.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy'],
    tags: ['dreams', 'reality', 'heist', 'complex']
  },
  {
    id: '5',
    title: 'The Dark Knight',
    genre: ['Action', 'Crime', 'Drama'],
    director: 'Christopher Nolan',
    year: 2008,
    rating: 9.0,
    duration: 152,
    poster: 'https://images.pexels.com/photos/7991578/pexels-photo-7991578.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    tags: ['superhero', 'chaos', 'morality', 'dark']
  },
  {
    id: '6',
    title: 'Forrest Gump',
    genre: ['Drama', 'Romance'],
    director: 'Robert Zemeckis',
    year: 1994,
    rating: 8.8,
    duration: 142,
    poster: 'https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75.',
    cast: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
    tags: ['life journey', 'innocence', 'history', 'love']
  },
  {
    id: '7',
    title: 'Interstellar',
    genre: ['Adventure', 'Drama', 'Sci-Fi'],
    director: 'Christopher Nolan',
    year: 2014,
    rating: 8.6,
    duration: 169,
    poster: 'https://images.pexels.com/photos/7991642/pexels-photo-7991642.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    tags: ['space', 'time', 'family', 'sacrifice']
  },
  {
    id: '8',
    title: 'The Matrix',
    genre: ['Action', 'Sci-Fi'],
    director: 'The Wachowskis',
    year: 1999,
    rating: 8.7,
    duration: 136,
    poster: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A computer programmer discovers that reality as he knows it is a simulation controlled by machines.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
    tags: ['reality', 'technology', 'rebellion', 'philosophy']
  },
  {
    id: '9',
    title: 'Goodfellas',
    genre: ['Biography', 'Crime', 'Drama'],
    director: 'Martin Scorsese',
    year: 1990,
    rating: 8.7,
    duration: 146,
    poster: 'https://images.pexels.com/photos/7991231/pexels-photo-7991231.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners.',
    cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci'],
    tags: ['mafia', 'betrayal', 'lifestyle', 'violence']
  },
  {
    id: '10',
    title: 'Casablanca',
    genre: ['Drama', 'Romance', 'War'],
    director: 'Michael Curtiz',
    year: 1942,
    rating: 8.5,
    duration: 102,
    poster: 'https://images.pexels.com/photos/7991235/pexels-photo-7991235.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A cynical American expatriate struggles to decide whether to help his former lover escape Nazi-occupied Morocco.',
    cast: ['Humphrey Bogart', 'Ingrid Bergman', 'Paul Henreid'],
    tags: ['classic', 'sacrifice', 'love', 'war']
  },
  {
    id: '11',
    title: 'Parasite',
    genre: ['Comedy', 'Drama', 'Thriller'],
    director: 'Bong Joon-ho',
    year: 2019,
    rating: 8.6,
    duration: 132,
    poster: 'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A poor family schemes to become employed by a wealthy family and infiltrate their household.',
    cast: ['Kang-ho Song', 'Sun-kyun Lee', 'Yeo-jeong Jo'],
    tags: ['class divide', 'dark comedy', 'social commentary', 'thriller']
  },
  {
    id: '12',
    title: 'Spirited Away',
    genre: ['Animation', 'Adventure', 'Fantasy'],
    director: 'Hayao Miyazaki',
    year: 2001,
    rating: 9.2,
    duration: 125,
    poster: 'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A young girl enters a world ruled by gods and witches where humans are changed into beasts.',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki'],
    tags: ['coming of age', 'magic', 'adventure', 'Studio Ghibli']
  }
];

export const genres = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 
  'Drama', 'Fantasy', 'Romance', 'Sci-Fi', 'Thriller', 'War'
];