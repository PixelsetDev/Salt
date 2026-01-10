import { GestureResponderEvent, Pressable, Text, TextProps, View } from 'react-native';
import { ReactNode, isValidElement } from 'react';
import { Linking } from 'react-native';

export const OText = ({
  className = '', children, ...props
}: {
  className?: string; children: any
}) => {
  return (
    <Text className={`font-sans-serif dark:text-white txt-lg ${className}`} {...props}>
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

export const OPressable = ({
  className = '', children, onPress, ...props
}: {
  className?: string; children: ReactNode; onPress: (event: GestureResponderEvent) => void;
}) => {
  return (
    <Pressable onPress={onPress} {...props}>
      {isValidElement(children) ? (
        <View className={`${className}`}>{children}</View>
      ) : (
        <Text className={`${className}`}>{children}</Text>
      )}
    </Pressable>
  );
};
