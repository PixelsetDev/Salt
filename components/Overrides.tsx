import {GestureResponderEvent, Pressable, Text, TextProps} from 'react-native';
import React, {ReactNode} from 'react';
import {Link} from "expo-router";

export const OText = ({ className = '', ...props }: TextProps & { className?: string }) => {
    return <Text className={`font-sans-serif dark:text-white txt-lg ${className}`} {...props} />;
};

export const OLink = ({ className = '', href = '', children, ...props }: { className?: string; href?: string; children: ReactNode; }) => {
    return (
        <Link className={`font-sans-serif ${className}`} {...props} href={`${href}`}>
            {children}
        </Link>
    );
};

export const OPressable = ({ className = '', children, onPress, ...props }: { className?: string; children: ReactNode; onPress: (event: GestureResponderEvent) => void; }) => {
    return (
        <Pressable className={`font-sans-serif ${className}`} onPress={onPress} {...props}>
            {children}
        </Pressable>
    );
};