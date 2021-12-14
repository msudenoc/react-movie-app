import { createContext, Dispatch, SetStateAction, useState } from 'react';

type UserContext = {
  sessionId: string;
  userName: string;
};

const initState: UserContext = {
  sessionId: '',
  userName: '',
};

export const Context = createContext<[UserContext | undefined, Dispatch<SetStateAction<UserContext | undefined>>]>([initState, () => {}]);

const UserProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<UserContext>();

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default UserProvider;
