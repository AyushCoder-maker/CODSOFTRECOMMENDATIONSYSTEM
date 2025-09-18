import { Movie, UserRating, Recommendation } from '../types';

export class RecommendationEngine {
  private movies: Movie[];
  private userRatings: UserRating[];

  constructor(movies: Movie[], userRatings: UserRating[] = []) {
    this.movies = movies;
    this.userRatings = userRatings;
  }

  // Content-based filtering
  getContentBasedRecommendations(limit: number = 6): Recommendation[] {
    const ratedMovies = this.getRatedMovies();
    if (ratedMovies.length === 0) {
      return this.getPopularMovies(limit);
    }

    const userPreferences = this.calculateUserPreferences(ratedMovies);
    const unratedMovies = this.getUnratedMovies();

    const recommendations = unratedMovies
      .map(movie => ({
        movie,
        score: this.calculateContentSimilarity(movie, userPreferences),
        reason: this.generateContentReason(movie, userPreferences)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  }

  // Collaborative filtering (simplified version)
  getCollaborativeRecommendations(limit: number = 6): Recommendation[] {
    const ratedMovies = this.getRatedMovies();
    if (ratedMovies.length === 0) {
      return this.getTrendingMovies(limit);
    }

    const userGenrePreferences = this.calculateGenrePreferences(ratedMovies);
    const unratedMovies = this.getUnratedMovies();

    const recommendations = unratedMovies
      .map(movie => ({
        movie,
        score: this.calculateCollaborativeScore(movie, userGenrePreferences),
        reason: this.generateCollaborativeReason(movie, userGenrePreferences)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return recommendations;
  }

  // Hybrid recommendations
  getHybridRecommendations(limit: number = 6): Recommendation[] {
    const contentRecs = this.getContentBasedRecommendations(limit * 2);
    const collabRecs = this.getCollaborativeRecommendations(limit * 2);

    const hybridMap = new Map<string, Recommendation>();

    // Combine and weight recommendations
    contentRecs.forEach(rec => {
      hybridMap.set(rec.movie.id, {
        ...rec,
        score: rec.score * 0.6, // Weight content-based at 60%
        reason: `Content match: ${rec.reason}`
      });
    });

    collabRecs.forEach(rec => {
      if (hybridMap.has(rec.movie.id)) {
        const existing = hybridMap.get(rec.movie.id)!;
        existing.score += rec.score * 0.4; // Weight collaborative at 40%
        existing.reason += ` + ${rec.reason}`;
      } else {
        hybridMap.set(rec.movie.id, {
          ...rec,
          score: rec.score * 0.4,
          reason: `User pattern: ${rec.reason}`
        });
      }
    });

    return Array.from(hybridMap.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  private getRatedMovies(): { movie: Movie; rating: number }[] {
    return this.userRatings
      .map(rating => {
        const movie = this.movies.find(m => m.id === rating.movieId);
        return movie ? { movie, rating: rating.rating } : null;
      })
      .filter(Boolean) as { movie: Movie; rating: number }[];
  }

  private getUnratedMovies(): Movie[] {
    const ratedIds = new Set(this.userRatings.map(r => r.movieId));
    return this.movies.filter(movie => !ratedIds.has(movie.id));
  }

  private calculateUserPreferences(ratedMovies: { movie: Movie; rating: number }[]) {
    const preferences = {
      genres: new Map<string, number>(),
      directors: new Map<string, number>(),
      actors: new Map<string, number>(),
      tags: new Map<string, number>()
    };

    ratedMovies.forEach(({ movie, rating }) => {
      const weight = rating / 5; // Normalize to 0-1

      movie.genre.forEach(genre => {
        preferences.genres.set(genre, (preferences.genres.get(genre) || 0) + weight);
      });

      preferences.directors.set(movie.director, (preferences.directors.get(movie.director) || 0) + weight);

      movie.cast.forEach(actor => {
        preferences.actors.set(actor, (preferences.actors.get(actor) || 0) + weight);
      });

      movie.tags.forEach(tag => {
        preferences.tags.set(tag, (preferences.tags.get(tag) || 0) + weight);
      });
    });

    return preferences;
  }

  private calculateContentSimilarity(movie: Movie, preferences: any): number {
    let score = 0;

    // Genre similarity
    movie.genre.forEach(genre => {
      score += preferences.genres.get(genre) || 0;
    });

    // Director similarity
    score += (preferences.directors.get(movie.director) || 0) * 2;

    // Cast similarity
    movie.cast.forEach(actor => {
      score += (preferences.actors.get(actor) || 0) * 1.5;
    });

    // Tag similarity
    movie.tags.forEach(tag => {
      score += (preferences.tags.get(tag) || 0) * 0.5;
    });

    // Boost for highly rated movies
    score += (movie.rating / 10) * 2;

    return score;
  }

  private calculateGenrePreferences(ratedMovies: { movie: Movie; rating: number }[]) {
    const genreScores = new Map<string, number>();

    ratedMovies.forEach(({ movie, rating }) => {
      movie.genre.forEach(genre => {
        genreScores.set(genre, (genreScores.get(genre) || 0) + rating);
      });
    });

    return genreScores;
  }

  private calculateCollaborativeScore(movie: Movie, genrePreferences: Map<string, number>): number {
    let score = 0;

    movie.genre.forEach(genre => {
      score += genrePreferences.get(genre) || 0;
    });

    // Add movie rating as a factor
    score += movie.rating;

    return score;
  }

  private generateContentReason(movie: Movie, preferences: any): string {
    const reasons = [];

    const topGenre = movie.genre.find(g => preferences.genres.has(g));
    if (topGenre) reasons.push(`you enjoy ${topGenre} films`);

    if (preferences.directors.has(movie.director)) {
      reasons.push(`you like ${movie.director}'s work`);
    }

    const commonActor = movie.cast.find(a => preferences.actors.has(a));
    if (commonActor) reasons.push(`features ${commonActor}`);

    return reasons.slice(0, 2).join(' and ') || 'highly rated film';
  }

  private generateCollaborativeReason(movie: Movie, genrePreferences: Map<string, number>): string {
    const topGenres = Array.from(genrePreferences.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([genre]) => genre);

    const matchingGenres = movie.genre.filter(g => topGenres.includes(g));
    
    if (matchingGenres.length > 0) {
      return `popular among fans of ${matchingGenres.join(' and ')}`;
    }

    return 'trending with similar users';
  }

  private getPopularMovies(limit: number): Recommendation[] {
    return this.movies
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map(movie => ({
        movie,
        score: movie.rating,
        reason: 'highly rated film'
      }));
  }

  private getTrendingMovies(limit: number): Recommendation[] {
    return this.movies
      .filter(movie => movie.year >= 2010)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map(movie => ({
        movie,
        score: movie.rating,
        reason: 'trending now'
      }));
  }
}