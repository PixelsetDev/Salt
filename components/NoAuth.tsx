import { OText } from './Overrides';
import { View } from 'react-native';
import { SignInButton } from './Auth';

const NoAuth = () => {
  return(
    <View className="p-sm bg-red-800 grid gap-2">
      <OText className="text-white">
        You need to log in to see this content.
      </OText>
      <SignInButton/>
    </View>
  );
}

export default NoAuth;