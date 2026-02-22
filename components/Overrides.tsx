import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { ReactNode, isValidElement } from 'react';
import { Linking } from 'react-native';

export const OText = ({
  className = '', children, ...props
}: {
  className?: string; children: any
}) => {
  return (
    <Text className={`font-sans-serif dark:text-white txt-xl ${className}`} {...props}>
      {children}
    </Text>
  )
};

export const OLink = ({
  className = '', href = '', children, target = '_self', ...props
}: {
  className?: string; href?: string; children: ReactNode; target?: '_self' | '_blank' | '_parent' | '_top'; display?: 'inline' | 'block';
}) => {
  return (
    <OPressable
      onPress={() => {
        if (typeof window !== 'undefined') {
          window.location.href = href;
        } else {
          Linking.openURL(href);
        }
      }}
    >
      {isValidElement(children) ? (
        <View className={`font-sans-serif ${className}`}>{children}</View>
      ) : (
        <Text className={`font-sans-serif ${className}`}>{children}</Text>
      )}
    </OPressable>
  );
};

export const OPressable = ({ className = '', children, onPress, disabled = false, ...props
}: {
  className?: string; children?: ReactNode; onPress: (event: GestureResponderEvent) => void; disabled?: boolean;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { transform: [{ scale: pressed && !disabled ? 0.96 : 1 }] }
      ]}
      {...props}
    >
      {isValidElement(children) ? (
        <View className={`${className} ${disabled ? 'opacity-50' : ''}`}>{children}</View>
      ) : (
        <Text className={`${className} ${disabled ? 'opacity-50' : ''}`}>{children}</Text>
      )}
    </Pressable>
  );
};