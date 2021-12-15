import { Link } from 'react-router-dom';
import { Wrapper, Image } from './Thumb.styles';

type Props = {
  image: string;
  movieId?: number;
  movieTitle?: string;
  clickable: boolean;
};

const Thumb: React.FC<Props> = ({ image, movieId, movieTitle, clickable }) => {
  const img = <Image src={image} alt={movieTitle}></Image>;
  return <Wrapper>{clickable ? <Link to={`/${movieId}`}>{img}</Link> : img}</Wrapper>;
};

export default Thumb;
