import { OText } from './Overrides';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ReactElement } from 'react';

export const ErrorBox = ({ message }: { message: string|ReactElement; }) => {
  return(<Box message={message} background={`bg-red-500`} border={`bg-red-800`} icon={`warning`}/>);
}

export const WarningBox = ({ message }: { message: string|ReactElement; }) => {
  return(<Box message={message} background={`bg-yellow-500`} border={`bg-yellow-600`} icon={`warning`}/>);
}

export const SuccessBox = ({ message }: { message: string|ReactElement; }) => {
  return(<Box message={message} background={`bg-green-500`} border={`bg-green-800`} icon={`checkmark`}/>);
}

export const InfoBox = ({ message }: { message: string|ReactElement; }) => {
  return(<Box message={message} background={`bg-blue-500`} border={`bg-blue-800`} icon={`info`}/>);
}

export const Box = ({ message, background, border, icon }: { message: string|ReactElement; background: string; border: string; icon: string; }) => {
  return(
    <View className={`flex-row ${background}`}>
      <FontAwesome name={icon} size={20} className={`text-white px-2 py-1 ${border} pt-2 w-10 text-center`}/><OText className={`text-white px-2 py-1`}>&nbsp;{message}</OText>
    </View>
  );
}