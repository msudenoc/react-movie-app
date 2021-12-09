import React, { Component } from 'react';

import API from '../API';

// config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

// components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import SearchBar from './SearchBar';
import Spinner from './Spinner';
import Button from './Button';

// hook
import { useHomeFetch } from '../hooks/useHomeFetch';

// image
import NoImage from '../images/no_image.jpg';
import { Link } from 'react-router-dom';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export class Home extends Component {
  state = {
    movies: initialState,
    searchTerm: '',
    isLoadingMore: false,
    loading: false,
    error: false,
  };

  fetchMovies = async (page, searchTerm = '') => {
    try {
      this.setState({ error: false, loading: true });

      const movies = await API.fetchMovies(searchTerm, page);
      this.setState((prev) => ({
        ...prev,
        movies: {
          ...movies,
          results: page > 1 ? [...prev.movies.results, ...movies.results] : [...movies.results],
        },
        loading: false,
      }));
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  };

  handleSearch = (searchTerm) => {
    this.setState({ movies: initialState, searchTerm }, () => this.fetchMovies(1, this.state.searchTerm));
  };

  handleLoadMore = () => {
    this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
  };

  getMovieImgOrDefault = (movie) => (movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage);

  getPoster = (searchTerm, movie) =>
    !searchTerm && movie ? (
      <Link to={`/${movie.id}`}>
        <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}`} title={movie.title} text={movie.overview} />
      </Link>
    ) : null;

  getHeader = (searchTerm) => (!searchTerm ? 'Popular Movies' : `Results for ${searchTerm}`);

  componentDidMount() {
    this.fetchMovies(1);
  }

  render() {
    const { searchTerm, movies } = this.state;
    return (
      <>
        {this.getPoster()}
        <SearchBar setSearchTerm={this.handleSearch}></SearchBar>
        <Grid header={this.getHeader(searchTerm, movies.results[0])}>
          {movies.results.map((movie, idx) => (
            <Thumb
              key={movie.id + idx}
              image={this.getMovieImgOrDefault(movie)}
              movieId={movie.id}
              movieTitle={movie.title}
              clickable={true}
            />
          ))}
        </Grid>
        {this.state.loading ? <Spinner /> : null}
        {this.state.movies.page < this.state.movies.total_pages && !this.state.loading ? (
          <Button text='Load more' callback={this.handleLoadMore} />
        ) : null}
      </>
    );
  }
}

// const Home2 = () => {
//   const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

//   const getMovieImgOrDefault = (movie) => (movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage);

//   const getPoster = () =>
//     !searchTerm && state.results[0] ? (
//       <Link to={`/${state.results[0].id}`}>
//         <HeroImage
//           image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
//           title={state.results[0].title}
//           text={state.results[0].overview}
//         />
//       </Link>
//     ) : null;

//   const getHeader = () => (!searchTerm ? 'Popular Movies' : `Results for ${searchTerm}`);

//   if (error) {
//     return <div>Something went wrong...</div>;
//   }

//   return (
//     <>
//       {getPoster()}
//       <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
//       <Grid header={getHeader()}>
//         {state.results.map((movie, idx) => (
//           <Thumb key={movie.id + idx} image={getMovieImgOrDefault(movie)} movieId={movie.id} movieTitle={movie.title} clickable={true} />
//         ))}
//       </Grid>
//       {loading ? <Spinner /> : null}
//       {state.page < state.total_pages && !loading ? <Button text='Load more' callback={() => setIsLoadingMore(true)} /> : null}
//     </>
//   );
// };

export default Home;
