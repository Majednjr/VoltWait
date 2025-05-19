import { useGlobalContext } from 'contexts/globalProvider.jsx';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logout } from 'services/apiAuth.js';
import { useEffect } from 'react';

const Account = () => {
  const { userDetails } = useGlobalContext();

  // Redirect to login if no user details are available
  useEffect(() => {
    if (!userDetails) {
      router.push('/(auth)/SignIn');
    }
  }, [userDetails]);

  async function handleLogout() {
    try {
      const error = await logout();
      if (error) {
        console.error('Logout error:', error);
      } else {
        router.replace('/(auth)/SignIn');
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  // Return loading state or null if userDetails is not available
  if (!userDetails) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#F9FAFB',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <View style={{ padding: 24 }}>
        <Text style={{ fontSize: 28, fontWeight: '800', color: '#1F2937', marginBottom: 16 }}>
          Account Details
        </Text>

        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>Username</Text>
            <Text style={{ fontSize: 18, color: '#111827', fontWeight: '600' }}>
              {userDetails?.user_name || 'N/A'}
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>Mobile Number</Text>
            <Text style={{ fontSize: 18, color: '#111827', fontWeight: '600' }}>
              {userDetails?.mobile_number || 'N/A'}
            </Text>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>Ban Details</Text>
            <Text style={{ fontSize: 18, color: '#111827', fontWeight: '600' }}>
              {userDetails?.is_banned ? 'Banned' : 'Not Banned'}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 4 }}>Total Points</Text>
            <Text style={{ fontSize: 18, color: '#111827', fontWeight: '600' }}>
              {userDetails?.reward_count || '0'} pts
            </Text>
          </View>
        </View>
      </View>

      {/* LogOut button */}
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: '#EF4444',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginTop: 24,
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Account;
