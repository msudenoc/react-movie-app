import Thumb from '../Thumb';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
import NoImage from '../../images/no_image.jpg';
import { Wrapper, Content, Text } from './MovieInfo.styles';
import { MovieState } from '../../hooks/useMovieFetch';
import Rate from '../Rate';
import { useContext } from 'react';
import { Context } from '../../context';
import API from '../../API';

type Props = {
  movie: MovieState;
};

const MovieInfo: React.FC<Props> = ({ movie }) => {
  const [user] = useContext(Context);

  const getPosterPath = (movie: MovieState) => (movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : NoImage);
  const handleRating = async (value: number) => {
    const rate = await API.rateMovie(user?.sessionId, movie.id, value);
    console.log(rate);
  };

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb image={getPosterPath(movie)} clickable={false} />
        <Text>
          <h1>{movie.title}</h1>
          <h3>PLOT</h3>
          <p>{movie.overview}</p>

          <div className='rating-directors'>
            <div>
              <h3>RATING</h3>
              <div className='score'>{movie.vote_average}</div>
            </div>
            <div className='director'>
              <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : null}</h3>
              {movie.directors.map((d) => (
                <p key={d.credit_id}>{d.name}</p>
              ))}
            </div>
          </div>
          {user ? (
            <div>
              <p>Rate movie</p>
              <Rate callback={handleRating} />
            </div>
          ) : null}
        </Text>
      </Content>
    </Wrapper>
  );
};

export default MovieInfo;
