import { View, Text, Pressable, Modal as RNModal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  maxw: string;
}

export const Modal = ({ visible, title, onClose, children, maxw = 'max-w-md' }: ModalProps) => {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        className="flex-1 items-center justify-center bg-black/60 p-4"
        onPress={onClose}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className={`w-full ${maxw} rounded-lg border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900`}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-serif text-2xl text-neutral-900 dark:text-neutral-50">{title}</Text>
            <Pressable onPress={onClose} className="p-1">
              <FontAwesome name="times" size={20} className="text-neutral-500 hover:text-neutral-700" />
            </Pressable>
          </View>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};