import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ErrorBox, SuccessBox } from './Boxes';

interface ToastProps {
  toast: { type: 'success' | 'error'; message: string } | null;
  onClear: () => void;
  duration?: number;
}

export const Toast = ({ toast, onClear, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClear, duration);
      return () => clearTimeout(timer);
    }
  }, [toast, onClear, duration]);

  if (!toast) return null;

  return (
    <View className="fixed top-20 left-4 right-4 z-[100]">
      {toast.type === 'success' ? (
        <SuccessBox message={toast.message} />
      ) : (
        <ErrorBox message={toast.message} />
      )}
    </View>
  );
};