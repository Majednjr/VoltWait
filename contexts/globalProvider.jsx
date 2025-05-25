import { router } from 'expo-router';
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
    checkUser();

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

  const signOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear state after sign-out
      setUser(null);
      setIsLoggedIn(false);
      setUserDetails(null);

      router.replace('/(auth)/SignIn');
    } catch (err) {
      console.error('Error signing out:', err);
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
        signOut,
        userDetails,
        setUserDetails,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
