import { OText } from './Overrides';
import { View } from 'react-native';
const NoAuth = () => {
  return(
    <View className="p-std">
      <OText className="bg-red-800 flex flex-row space-x-2 p-sm text-white">
        You need to log in to see this content.
      </OText>
    </View>
  );
}

export default NoAuth;