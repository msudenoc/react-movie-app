import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context';
import RMDBLogo from '../../images/react-movie-logo.svg';
import TMDBLogo from '../../images/tmdb_logo.svg';
import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';

const Header: React.FC = () => {
  const [user] = useContext(Context);

  return (
    <Wrapper>
      <Content>
        <Link to='/'>
          <LogoImg src={RMDBLogo} alt='rmdb-logo' />
        </Link>
        <div className='auth'>
          {user ? <span className='loggedin'>Logged in as: {user.userName}</span> : <Link to='/login'>Login</Link>}
        </div>
        <TMDBLogoImg src={TMDBLogo} alt='tmdb-logo' />
      </Content>
    </Wrapper>
  );
};

export default Header;
