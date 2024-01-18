import {
  createContext,
  useState,
  useContext,
  useMemo,
  ReactNode,
} from 'react';

interface UserData {
  username: string;
  email: string;
}

type AuthData = {
  logIn: (data: UserData) => boolean;
  logOut: () => boolean;
  userData: any;
};

export const AuthContext = createContext<AuthData>({
  logIn: () => {},
  logOut: () => {},
  userData: null,
});

const AuthProvider = ({ children }: {children: ReactNode}) => {
  const storedUserData = localStorage.getItem('userId');
  const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [userData, setUserData] = useState(initialUserData);

  const logIn = (data: UserData) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserData(data);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setUserData(null);
  };

  const value = useMemo(() => ({
    logIn,
    logOut,
    userData,
  }), [userData]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthData => useContext(AuthContext);

export { AuthProvider, useAuth };
