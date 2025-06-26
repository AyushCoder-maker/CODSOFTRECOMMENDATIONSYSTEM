import { useState, useEffect, useMemo } from 'react';
import { Movie, UserRating, Recommendation } from '../types';
import { RecommendationEngine } from '../utils/recommendationEngine';
import { movies } from '../data/movies';

export const useRecommendations = () => {
  const [userRatings, setUserRatings] = useState<UserRating[]>(() => {
    const saved = localStorage.getItem('movieRatings');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState<'hybrid' | 'content' | 'collaborative'>('hybrid');

  const recommendationEngine = useMemo(() => {
    return new RecommendationEngine(movies, userRatings);
  }, [userRatings]);

  const recommendations = useMemo(() => {
    switch (activeTab) {
      case 'content':
        return recommendationEngine.getContentBasedRecommendations(12);
      case 'collaborative':
        return recommendationEngine.getCollaborativeRecommendations(12);
      default:
        return recommendationEngine.getHybridRecommendations(12);
    }
  }, [recommendationEngine, activeTab]);

  const addRating = (movieId: string, rating: number) => {
    const newRatings = userRatings.filter(r => r.movieId !== movieId);
    newRatings.push({
      movieId,
      rating,
      timestamp: Date.now()
    });
    
    setUserRatings(newRatings);
  };

  const getRating = (movieId: string): number | null => {
    const rating = userRatings.find(r => r.movieId === movieId);
    return rating ? rating.rating : null;
  };

  const getRatedMovies = (): { movie: Movie; rating: number }[] => {
    return userRatings
      .map(rating => {
        const movie = movies.find(m => m.id === rating.movieId);
        return movie ? { movie, rating: rating.rating } : null;
      })
      .filter(Boolean) as { movie: Movie; rating: number }[];
  };

  useEffect(() => {
    localStorage.setItem('movieRatings', JSON.stringify(userRatings));
  }, [userRatings]);

  return {
    recommendations,
    activeTab,
    setActiveTab,
    addRating,
    getRating,
    getRatedMovies,
    userRatings
  };
};