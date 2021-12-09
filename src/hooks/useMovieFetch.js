import { useState, useEffect } from 'react';
import { getJson, storeJson } from '../session-storage';

import API from '../API';

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({});
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

    const stored = getJson(movieId);
    if (stored) {
      setState(stored);
      setLoading(false);
    } else {
      fetchData();
    }
  }, [movieId]);

  useEffect(() => {
    storeJson(movieId, state);
  }, [movieId, state]);

  return { state, loading, error };
};
