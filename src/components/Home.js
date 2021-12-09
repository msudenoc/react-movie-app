import React from 'react';

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

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } =
    useHomeFetch();

  const getMovieImgOrDefault = (movie) =>
    movie.poster_path
      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
      : NoImage;

  const getPoster = () =>
    !searchTerm && state.results[0] ? (
      <Link to={`/${state.results[0].id}`}>
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].title}
          text={state.results[0].overview}
        />
      </Link>
    ) : null;

  const getHeader = () =>
    !searchTerm ? 'Popular Movies' : `Results for ${searchTerm}`;

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      {getPoster()}
      <SearchBar setSearchTerm={setSearchTerm}></SearchBar>
      <Grid header={getHeader()}>
        {state.results.map((movie, idx) => (
          <Thumb
            key={movie.id + idx}
            image={getMovieImgOrDefault(movie)}
            movieId={movie.id}
            movieTitle={movie.title}
            clickable={true}
          />
        ))}
      </Grid>
      {loading ? <Spinner /> : null}
      {state.page < state.total_pages && !loading ? (
        <Button text='Load more' callback={() => setIsLoadingMore(true)} />
      ) : null}
    </>
  );
};

export default Home;
