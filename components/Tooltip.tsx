import { useState, useRef } from 'react';
import { Pressable, View, Text, Platform } from 'react-native';

export const Tooltip = ({ text, children }: {
  text: string;
  children: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <div
        style={{ position: 'relative', display: 'inline-block' }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
      >
        {children}
        {visible && (
          <div style={{
            position: 'absolute',
            bottom: '120%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0,0,0,0.75)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            fontSize: '12px',
            zIndex: 999,
            pointerEvents: 'none',
          }}>
            {text}
          </div>
        )}
      </div>
    );
  }

  return (
    <Pressable onPress={() => setVisible(v => !v)}>
      {children}
      {visible && (
        <View style={{
          position: 'absolute',
          bottom: '120%',
          left: '50%',
          backgroundColor: 'rgba(0,0,0,0.75)',
          padding: 6,
          borderRadius: 4,
          zIndex: 999,
        }}>
          <Text style={{ color: 'white', fontSize: 12, whiteSpace: 'nowrap' }}>{text}</Text>
        </View>
      )}
    </Pressable>
  );
};