import React from 'react';
import { Link } from 'react-router-dom';
// styles
import { Wrapper, Image } from './Thumb.styles';

const Thumb = ({ image, movieId, movieTitle, clickable }) => {
  const img = <Image src={image} alt={movieTitle}></Image>;
  return <Wrapper>{clickable ? <Link to={`/${movieId}`}>{img}</Link> : img}</Wrapper>;
};

export default Thumb;
