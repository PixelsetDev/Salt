import { View } from 'react-native';
import { OText } from './Overrides';

export function List({ children }: { children: React.ReactNode }) {
  return <View className="grid">{children}</View>;
}

export function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <View className="flex-row gap-2">
      <OText>•</OText>
      <OText>{children}</OText>
    </View>
  );
}