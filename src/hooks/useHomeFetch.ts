import { useState, useEffect } from 'react';
import API, { Movie, Movies } from '../API';
import { getJson, storeJson } from '../session-storage';

const initialState = {
  page: 0,
  results: [] as Movie[],
  total_pages: 0,
  total_results: 0,
};

const storageKey = 'homeState';

export const useHomeFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page: number, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      setState((prev) => ({
        ...movies,
        results: page > 1 ? [...prev.results, ...movies.results] : [...movies.results],
      }));
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  // initial and search
  useEffect(() => {
    if (!searchTerm) {
      const sessionState = getJson<Movies>(storageKey);
      if (sessionState) {
        setState(sessionState);
        return;
      }
    }

    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // pagination
  useEffect(() => {
    if (isLoadingMore) {
      fetchMovies(state.page + 1, searchTerm);
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, searchTerm, state.page]);

  // write to session
  useEffect(() => {
    if (!searchTerm) {
      storeJson(storageKey, state);
    }
  }, [searchTerm, state]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
