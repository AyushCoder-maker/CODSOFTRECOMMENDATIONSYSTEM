import React, { useState } from 'react';
import { Film, User, Search, Filter } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { RecommendationTabs } from './components/RecommendationTabs';
import { UserProfile } from './components/UserProfile';
import { useRecommendations } from './hooks/useRecommendations';
import { movies, genres } from './data/movies';

function App() {
  const {
    recommendations,
    activeTab,
    setActiveTab,
    addRating,
    getRating,
    getRatedMovies
  } = useRecommendations();

  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showAllMovies, setShowAllMovies] = useState(false);

  const ratedMovies = getRatedMovies();

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.cast.some(actor => actor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesGenre = !selectedGenre || movie.genre.includes(selectedGenre);
    
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CineMatch
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
              >
                <User className="w-4 h-4" />
                Profile ({ratedMovies.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Favorite Movie
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our intelligent recommendation system learns from your preferences to suggest movies you'll love.
            Rate movies to get personalized recommendations powered by advanced algorithms.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search movies, directors, or actors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white min-w-48"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowAllMovies(!showAllMovies)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                showAllMovies
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showAllMovies ? 'Show Recommendations' : 'Browse All Movies'}
            </button>
          </div>
        </div>

        {showAllMovies ? (
          /* All Movies Section */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                All Movies ({filteredMovies.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={getRating(movie.id)}
                  onRate={addRating}
                />
              ))}
            </div>

            {filteredMovies.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No movies found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        ) : (
          /* Recommendations Section */
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Personalized Recommendations
              </h3>
              <p className="text-gray-600">
                {ratedMovies.length === 0 
                  ? "Rate some movies to get personalized recommendations!"
                  : `Based on your ${ratedMovies.length} rating${ratedMovies.length === 1 ? '' : 's'}`
                }
              </p>
            </div>

            <RecommendationTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {recommendations.map(rec => (
                <MovieCard
                  key={rec.movie.id}
                  movie={rec.movie}
                  userRating={getRating(rec.movie.id)}
                  onRate={addRating}
                  recommendationReason={rec.reason}
                  showRecommendationReason={true}
                />
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="text-center py-12">
                <Film className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No recommendations yet</h3>
                <p className="text-gray-500">Rate some movies to get personalized recommendations!</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Stats */}
        {ratedMovies.length > 0 && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">{ratedMovies.length}</div>
                <div className="text-blue-100">Movies Rated</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">
                  {(ratedMovies.reduce((sum, item) => sum + item.rating, 0) / ratedMovies.length).toFixed(1)}
                </div>
                <div className="text-blue-100">Average Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">{recommendations.length}</div>
                <div className="text-blue-100">Recommendations</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <UserProfile
        ratedMovies={ratedMovies}
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </div>
  );
}

export default App;