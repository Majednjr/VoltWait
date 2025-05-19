import { useGlobalContext } from 'contexts/globalProvider.jsx';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getRewardCount, redeemReward } from 'services/apiCheckIn.js';

const More = () => {
  const { userDetails, setUserDetails } = useGlobalContext();
  const [rewardPoints, setRewardPoints] = useState(0);

  useEffect(() => {
    const fetchRewardPoints = async () => {
      const points = await getRewardCount(userDetails.id);
      setRewardPoints(points);
    };

    fetchRewardPoints();
  }, []);

  const handleRedeem = async () => {
    // Placeholder for redeem logic
    const data = await redeemReward(userDetails.id); // Redeem 50 points
    setRewardPoints((prevPoints) => prevPoints - 50); // Update local state
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      reward_count: prevDetails.reward_count - 50,
    })); // Update global state

    alert('Redeemed 50 points for 3 JDs!');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB', padding: 24 }}>
      <Text style={{ fontSize: 28, fontWeight: '800', color: '#1F2937', marginBottom: 20 }}>
        Reward Points
      </Text>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 24,
        }}>
        <Text style={{ fontSize: 16, color: '#6B7280', marginBottom: 6 }}>Total Points</Text>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#10B981' }}>
          {rewardPoints} pts
        </Text>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          padding: 20,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
          marginBottom: 16,
        }}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 10 }}>
          Redeem 50 points for 3 JDs
        </Text>
        <TouchableOpacity
          onPress={handleRedeem}
          disabled={rewardPoints < 50}
          style={{
            backgroundColor: rewardPoints >= 50 ? '#3B82F6' : '#9CA3AF',
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: 'center',
          }}>
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>Redeem Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default More;
