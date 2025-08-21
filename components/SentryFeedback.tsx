import React, { ReactNode } from 'react';
import { Pressable, Text } from 'react-native';
import * as Sentry from '@sentry/react-native';

const FeedbackButton = ({ className, textClassName, ...props }: {className: string; textClassName: string; }) => {
  const handlePress = () => {
    if (Sentry?.showFeedbackWidget) {
      Sentry.showFeedbackWidget();
    }
  };

  return (
    <Pressable
      className={className}
      onPress={handlePress}
      {...props}
    >
      <Text className={`text-center ${textClassName}`}>
        {'Give Feedback'}
      </Text>
    </Pressable>
  );
};

export default FeedbackButton;