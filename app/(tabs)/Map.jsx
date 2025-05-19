import MapMain from 'components/MapMain.jsx';
import MapOptions from 'components/MapOptions.jsx';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Map = () => {
  return (
    <SafeAreaView>
      <MapMain />
    </SafeAreaView>
  );
};

export default Map;
