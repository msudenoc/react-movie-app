import React from 'react';
import { useParams } from 'react-router';

// config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';

// components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from './BreadCrumb';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';

// hook
import { useMovieFetch } from '../hooks/useMovieFetch';

// image
import NoImage from '../images/no_image.jpg';

const Movie: React.FC = () => {
  const movieId: number = Number(useParams().movieId);
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
      <Grid header='Cast'>
        {movie.actors.map((a) => (
          <Actor
            key={a.credit_id}
            name={a.name}
            character={a.character}
            imageUrl={a.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${a.profile_path}` : NoImage}
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;
