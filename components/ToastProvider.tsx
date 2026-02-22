import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import { ErrorBox, SuccessBox } from './Boxes';

type ToastType = { type: 'success' | 'error'; message: string };
const ToastContext = createContext<{ showToast: (t: ToastType) => void } | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastType | null>(null);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);
  return (
    <ToastContext.Provider value={{ showToast: (t) => setToast(t) }}>
      {children}
      {toast && (
        <View className="fixed top-8 right-8 z-[100]">
          {toast.type === 'success' ? <SuccessBox message={toast.message} /> : <ErrorBox message={toast.message} />}
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};