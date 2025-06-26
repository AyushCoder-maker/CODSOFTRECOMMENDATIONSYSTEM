export interface Movie {
  id: string;
  title: string;
  genre: string[];
  director: string;
  year: number;
  rating: number;
  duration: number;
  poster: string;
  description: string;
  cast: string[];
  tags: string[];
}

export interface UserRating {
  movieId: string;
  rating: number;
  timestamp: number;
}

export interface User {
  id: string;
  name: string;
  ratings: UserRating[];
  preferences: {
    genres: string[];
    directors: string[];
    actors: string[];
  };
}

export interface Recommendation {
  movie: Movie;
  score: number;
  reason: string;
}