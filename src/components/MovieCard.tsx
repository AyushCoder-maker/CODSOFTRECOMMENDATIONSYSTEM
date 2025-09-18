import React, { useState } from 'react';
import { Star, Clock, Calendar, Users } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  userRating?: number | null;
  onRate?: (movieId: string, rating: number) => void;
  recommendationReason?: string;
  showRecommendationReason?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  userRating,
  onRate,
  recommendationReason,
  showRecommendationReason = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleStarClick = (rating: number) => {
    if (onRate) {
      onRate(movie.id, rating);
    }
    setShowRatingModal(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowRatingModal(true)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {movie.rating}
          </div>

          {/* User Rating */}
          {userRating && (
            <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {userRating}
            </div>
          )}

          {/* Recommendation Reason */}
          {showRecommendationReason && recommendationReason && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs text-gray-800">
              Recommended: {recommendationReason}
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{movie.title}</h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.slice(0, 2).map(genre => (
              <span key={genre} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {genre}
              </span>
            ))}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{movie.description}</p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {movie.year}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {movie.duration}m
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {movie.director.split(' ').pop()}
            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-32 h-48 object-cover rounded-lg mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{movie.title}</h2>
              <p className="text-gray-600">Rate this movie</p>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  className="group transition-transform duration-200 hover:scale-110"
                >
                  <Star 
                    className={`w-12 h-12 transition-colors duration-200 ${
                      (userRating && star <= userRating) 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300 group-hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600 mb-2">{movie.description}</p>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {movie.genre.map(genre => (
                  <span key={genre} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Directed by {movie.director} • {movie.year} • {movie.duration} minutes
              </p>
            </div>

            <button
              onClick={() => setShowRatingModal(false)}
              className="w-full py-3 px-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};