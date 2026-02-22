import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { OPressable } from './Overrides';

export const StarRating = ({ rating, onRatingChange, disabled = false
}: {
  rating: number;
  onRatingChange: (n: number) => void;
  disabled?: boolean;
}) => {
  return (
    <View className="flex-row justify-center gap-4 py-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <OPressable
          key={n}
          disabled={disabled}
          onPress={() => onRatingChange(n)}
        >
          <FontAwesome
            name={n <= rating ? "star" : "star-o"}
            size={32}
            color="#EAB308"
          />
        </OPressable>
      ))}
    </View>
  );
};