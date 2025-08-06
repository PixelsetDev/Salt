import { View } from 'react-native';
import { ReactNode } from 'react';

export const Mobile = ({ className = '', children, ...props }: { className?: string; children: ReactNode; }) => {
  return (
    <View className={`${className} nodesktop`} {...props}>
      {children}
    </View>
  )
}

export const Desktop = ({ className = '', children, ...props }: { className?: string; children: ReactNode; }) => {
  return (
    <View className={`${className} nomobile`} {...props}>
      {children}
    </View>
  )
}
