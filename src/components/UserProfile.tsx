import React from 'react';
import { Star, TrendingUp, Heart, Award } from 'lucide-react';
import { Movie } from '../types';

interface UserProfileProps {
  ratedMovies: { movie: Movie; rating: number }[];
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  ratedMovies,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const averageRating = ratedMovies.length > 0 
    ? ratedMovies.reduce((sum, item) => sum + item.rating, 0) / ratedMovies.length
    : 0;

  const genreCount = ratedMovies.reduce((acc, { movie }) => {
    movie.genre.forEach(genre => {
      acc[genre] = (acc[genre] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const favoriteGenres = Object.entries(genreCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  const recentlyRated = ratedMovies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Your Movie Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6" />
              <span className="text-blue-100">Average Rating</span>
            </div>
            <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6" />
              <span className="text-green-100">Movies Rated</span>
            </div>
            <div className="text-3xl font-bold">{ratedMovies.length}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6" />
              <span className="text-purple-100">Top Genre</span>
            </div>
            <div className="text-lg font-bold">
              {favoriteGenres[0] ? favoriteGenres[0][0] : 'None'}
            </div>
          </div>
        </div>

        {favoriteGenres.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Favorite Genres
            </h3>
            <div className="flex flex-wrap gap-3">
              {favoriteGenres.map(([genre, count]) => (
                <div key={genre} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                  <span className="font-medium">{genre}</span>
                  <span className="ml-2 text-blue-600">({count})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentlyRated.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your Top Rated Movies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyRated.map(({ movie, rating }) => (
                <div key={movie.id} className="relative group">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    {rating}
                  </div>
                  <p className="mt-2 text-sm font-medium text-gray-900 line-clamp-2">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {ratedMovies.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No ratings yet</h3>
            <p className="text-gray-500">Start rating movies to see your personalized profile!</p>
          </div>
        )}
      </div>
    </div>
  );
};