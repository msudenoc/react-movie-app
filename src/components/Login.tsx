import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
import Button from './Button';
import { Wrapper } from './Login.styles';
import API from '../API';

const Login: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [, setUser] = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(requestToken, userName, password);

      setUser({
        sessionId: sessionId.session_id,
        userName: userName,
      });

      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <Wrapper>
      {error ? <div className='error'>There was an error</div> : null}
      <label htmlFor='username'>Username:</label>
      <input type='text' value={userName} name='username' onChange={(e) => setUserName(e.currentTarget.value)} />
      <input type='password' value={password} name='password' onChange={(e) => setPassword(e.currentTarget.value)} />
      <Button text='Login' callback={handleSubmit}></Button>
    </Wrapper>
  );
};

export default Login;
