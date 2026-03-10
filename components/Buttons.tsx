import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { OPressable } from './Overrides';

interface ButtonArrowProps {
  onPress: () => void;
  children: React.ReactNode;
}

export function ButtonArrow({ onPress, children }: ButtonArrowProps) {
  return (
    <OPressable onPress={onPress}>
      <View className="bg-secondary p-xs flex-row items-center gap-std">
        <View className="flex-1">{children}</View>
        <FontAwesome name="chevron-right" size={14} color="#6b7280" />
      </View>
    </OPressable>
  );
}