import './../global.css';
import { View, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Homepage, WelcomeScreen } from '../components/Homepage';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(Platform.OS === 'web' ? false : null);
  const [showMainApp, setShowMainApp] = useState(false);

  useEffect(() => {
    // Skip the first launch logic if on web
    if (Platform.OS === 'web') return;

    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isFirstLaunch && !showMainApp) {
    return <WelcomeScreen onContinue={() => setShowMainApp(true)} />;
  }

  return <Homepage />;
}
