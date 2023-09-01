import { 
  createContext, 
  useState, 
  useContext, 
  useMemo 
} from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userId')) || null);

  const logIn = (data) => {
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

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
