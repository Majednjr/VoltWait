import { useContext, createContext, useState, useEffect } from 'react';
import supabase from 'services/supabase.js';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Check current session on mount
    checkUser();

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user || null;
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
      setIsLoading(false);

      if (currentUser) {
        fetchUserDetails(currentUser.id);
      } else {
        setUserDetails(null);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user || null;

      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        await fetchUserDetails(currentUser.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserDetails = async (userId) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      console.error('Error fetching user details:', error);
      setUserDetails(null);
    } else {
      setUserDetails(data);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsLoggedIn(false);
      setUserDetails(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        isLoading,
        setIsLoading,
        signOut: handleSignOut,
        userDetails,
        setUserDetails,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
