import { OText } from './Overrides';
import { View } from 'react-native';
import { SignInButton } from './auth/Auth';
import { ReactNode } from 'react';

export const Unauthed = () => {
  return(
    <View className={`p-sm grid gap-2 bg-red-300`}>
      <OText className={`text-black`}>
        You need to login to access this content.
      </OText>
      <SignInButton/>
    </View>
  );
}

export const ErrorBox = ({ children }: { children: ReactNode; }) => {
  return(
    <Box className={`bg-red-300`}>
      {children}
    </Box>
  );
}

export const WarningBox = ({ children }: { children: ReactNode; }) => {
  return(
    <Box className={`bg-yellow-400`}>
      {children}
    </Box>
  );
}

export const SuccessBox = ({ children }: { children: ReactNode; }) => {
  return(
    <Box className={`bg-green-300`}>
      {children}
    </Box>
  );
}

export const InfoBox = ({ children }: { children: ReactNode; }) => {
  return(
    <Box className={`bg-blue-300`}>
      {children}
    </Box>
  );
}

export const Box = ({ className = '', children }: { className: string; children: ReactNode; }) => {
  return(
    <View className={`p-sm grid gap-2 ${className}`}>
      {children}
    </View>
  );
}