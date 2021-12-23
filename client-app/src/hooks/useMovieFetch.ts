import { useState, useEffect } from 'react';
import API, { Cast, Crew, Movie } from '../API';

export type MovieState = Movie & {
  directors: Crew[];
  actors: Cast[];
};

export type UseMovieFetchResult = {
  state: MovieState;
  loading: boolean;
  error: boolean;
};

export const useMovieFetch = (movieId: number): UseMovieFetchResult => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({} as MovieState);
        setLoading(true);
        setError(false);

        const movie = await API.fetchMovie(movieId);
        const credits = await API.fetchCredits(movieId);
        const directors = credits.crew.filter((m) => m.job === 'Director');

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });
      } catch (err) {
        setError(true);
      }

      setLoading(false);
    };

    fetchData();
  }, [movieId]);

  return { state, loading, error };
};
