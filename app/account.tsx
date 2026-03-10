import "./../global.css";
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Navbar, { Footer } from '../components/Commons';
import { useLogto } from '@logto/rn';
import { SignInButton } from '../components/auth/Auth';
import { OLink, OText, OPressable } from '../components/Overrides';
import { useUser } from '../components/auth/UserProvider';
import { useToast } from '../components/ToastProvider.tsx';
import { useState, useEffect } from 'react';
import { ErrorBox } from '../components/Boxes.tsx';
import { Picker } from '@react-native-picker/picker';
import { API_BASE } from '../utils/settings.ts';
import { useApiCall } from '../utils/api.ts';

type Preferences = {
  activity_privacy:    boolean;
  email_marketing:     boolean;
  email_notifications: boolean;
  email_reminders:     boolean;
  email_updates:       boolean;
};

const DEFAULT_PREFS: Preferences = {
  activity_privacy:    true,
  email_marketing:     true,
  email_notifications: true,
  email_reminders:     true,
  email_updates:       true,
};

export default function App() {
  const { isAuthenticated } = useLogto();
  const { user } = useUser();
  const apiCall = useApiCall();
  const { showToast } = useToast();
  const [saving, setSaving] = useState(false);

  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFS);

  useEffect(() => {
    if (user?.preferences) {
      setPrefs({
        activity_privacy:    user.preferences.activity_privacy    ?? true,
        email_marketing:     user.preferences.email_marketing     ?? true,
        email_notifications: user.preferences.email_notifications ?? true,
        email_reminders:     user.preferences.email_reminders     ?? true,
        email_updates:       user.preferences.email_updates       ?? true,
      });
    }
  }, [user]);

  const handlePreferenceChange = (key: keyof Preferences, value: string) => {
    setPrefs(prev => ({ ...prev, [key]: value === 'true' }));
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      const res = await apiCall(`${API_BASE}/v1/users/[me]`, true, {
        method: 'PUT',
        body: JSON.stringify(prefs),
      });

      if (res.status !== 200) throw new Error('Failed to save preferences.');

      showToast({ type: 'success', message: 'Preferences saved.' });
    } catch (e: any) {
      showToast({ type: 'error', message: e.message });
    } finally {
      setSaving(false);
    }
  };

  const boolToStr = (val: boolean) => (val ? 'true' : 'false');

  return (
    <ScrollView className={`body`}>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          {isAuthenticated ? (
            <Text className="h1 font-serif text-white">Your account</Text>
          ) : (
            <Text className="h1 font-serif text-white">Sign in</Text>
          )}
          {user?.preferences === null && (
            <ErrorBox message="You must set your preferences before you can continue." />
          )}
        </View>
      </View>

      <View className="p-std gap-std body">
        {isAuthenticated ? (
          <View>
            {user ? (
              <View className={`grid-2-1 gap-std`}>
                <View className={`grid gap-std bg-secondary p-xs`}>
                  <Text className={`h2 font-serif`}>About you</Text>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Name:</OText>
                    <OText>{user.name}</OText>
                  </View>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Username:</OText>
                    <OText>@{user.username}</OText>
                  </View>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Email:</OText>
                    <OText>{user.email}</OText>
                  </View>
                </View>

                <View className={`grid gap-std bg-secondary p-xs`}>
                  <Text className={`h2 font-serif`}>Your links</Text>
                  <OLink href={`/@${user.username}`} className={`btn btn-secondary`}>Your profile</OLink>
                  <OLink href={`https://portalsso.com`} className={`btn btn-secondary`}>Manage your Portal Account</OLink>
                </View>

                <View className={`grid-2-1 span-2 gap-std bg-secondary p-xs`}>
                  <Text className={`h2 font-serif span-2`}>Your Preferences</Text>

                  {user.preferences === null && (
                    <View className="span-2">
                      <ErrorBox message="You must set your preferences before you can continue." />
                    </View>
                  )}

                  <View className="grid gap-sm">
                    <OText>Marketing Emails</OText>
                    <OText className="txt-xs txt-subtle">Includes promotions and general marketing.</OText>
                    <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={boolToStr(prefs.email_marketing)} onValueChange={(v) => handlePreferenceChange('email_marketing', v)}>
                      <Picker.Item label="Yes" value="true" />
                      <Picker.Item label="No" value="false" />
                    </Picker>
                  </View>

                  <View className="grid gap-sm">
                    <OText>Update Emails</OText>
                    <OText className="txt-xs txt-subtle">Includes information about new OurCookbook updates.</OText>
                    <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={boolToStr(prefs.email_updates)} onValueChange={(v) => handlePreferenceChange('email_updates', v)}>
                      <Picker.Item label="Yes" value="true" />
                      <Picker.Item label="No" value="false" />
                    </Picker>
                  </View>

                  <View className="grid gap-sm">
                    <OText>Reminder Emails</OText>
                    <OText className="txt-xs txt-subtle">Reminds you when you have outstanding actions.</OText>
                    <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={boolToStr(prefs.email_reminders)} onValueChange={(v) => handlePreferenceChange('email_updates', v)}>
                      <Picker.Item label="Yes" value="true" />
                      <Picker.Item label="No" value="false" />
                    </Picker>
                  </View>

                  <View className="grid gap-sm">
                    <OText>Notification Emails</OText>
                    <OText className="txt-xs txt-subtle">Emails you notifications.</OText>
                    <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={boolToStr(prefs.email_notifications)} onValueChange={(v) => handlePreferenceChange('email_notifications', v)}>
                      <Picker.Item label="Yes" value="true" />
                      <Picker.Item label="No" value="false" />
                    </Picker>
                  </View>

                  <View className="grid gap-sm">
                    <OText>Activity Privacy</OText>
                    <OText className="txt-xs txt-subtle">Makes your activity visible to others.</OText>
                    <Picker style={{ height: 40, flex: 1 }} className="input" selectedValue={boolToStr(prefs.activity_privacy)} onValueChange={(v) => handlePreferenceChange('activity_privacy', v)}>
                      <Picker.Item label="Public" value="true" />
                      <Picker.Item label="Private" value="false" />
                    </Picker>
                  </View>

                  <View className="span-2">
                    <OPressable
                      className={`btn btn-primary ${saving ? 'opacity-50' : ''}`}
                      disabled={saving}
                      onPress={savePreferences}
                    >
                      {saving ? 'Saving...' : 'Save Preferences'}
                    </OPressable>
                  </View>
                </View>
              </View>
            ) : (
              <ActivityIndicator size="large"/>
            )}
          </View>
        ) : (
          <SignInButton className={`btn btn-primary`} />
        )}
      </View>
      <Footer />
    </ScrollView>
  );
}