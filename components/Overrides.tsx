import {GestureResponderEvent, Pressable, Text, TextProps} from 'react-native';
import {ReactNode} from 'react';
import {Link} from "expo-router";

export const OText = ({ className = '', ...props }: TextProps & { className?: string }) => {
    return <Text className={`font-sans-serif dark:text-white txt-lg ${className}`} {...props} />;
};

export const OLink = ({ className = '', href = '', children, target = "_self", ...props }: { className?: string; href?: string; children: string; target?: '_self' | '_blank' | '_parent' | '_top'; }) => {
  return (
    <Link {...props} href={`${href}`} target={`${target}`}>
      <Text className={`font-sans-serif ${className}`}>{children}</Text>
    </Link>
  )
};

export const OPressable = ({ className = '', children, onPress, ...props }: { className?: string; children: ReactNode; onPress: (event: GestureResponderEvent) => void; }) => {
  return (
    <Pressable onPress={onPress} {...props}>
      <Text className={`${className}`}>{children}</Text>
    </Pressable>
  );
};