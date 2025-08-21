import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import { Footer, Navbar } from '../components/Commons';
import { useLogto } from '@logto/rn';
import { SignInButton } from '../components/Auth';
import { OLink, OText } from '../components/Overrides';
import { useEffect, useState } from 'react';

export default function App() {
  const { isAuthenticated, fetchUserInfo } = useLogto();
  const [user, setUser] = useState<{
    name?: any
    username?: any
    email?: any
  }| null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUser().finally();
    }

    async function fetchUser() {
      const userInfo = await fetchUserInfo();
      setUser(userInfo);
    }
  }, [isAuthenticated, fetchUserInfo]); // <--- add dependency to avoid infinite loop

  return (
    <ScrollView>
      <Navbar />
      <View className="header grid-2">
        <View className="gap-std grid">
          {isAuthenticated ? (
            <Text className="h1 font-serif text-white">Your account</Text>
          ) : (
            <Text className="h1 font-serif text-white">Sign in</Text>
          )}
        </View>
      </View>

      <View className="p-std gap-std">
        {isAuthenticated ? (
          <View>
            {user ? (
              <View className={`grid-2 gap-std`}>
                <View className={`grid gap-std bg-secondary p-xs`}>
                  <Text className={`h2 font-serif`}>About you</Text>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Name:</OText>
                    <OText>{ user.name }</OText>
                  </View>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Username:</OText>
                    <OText>@{ user.username }</OText>
                  </View>
                  <View className={`flex flex-row gap-2`}>
                    <OText className={`font-bold`}>Email:</OText>
                    <OText>{ user.email }</OText>
                  </View>
                </View>

                <View className={`grid gap-std bg-secondary p-xs`}>
                  <Text className={`h2 font-serif`}>Your links</Text>
                  <OLink href={`/@${ user.username }`} className={`btn btn-secondary`}>Your profile</OLink>
                </View>
              </View>
            ) : (
              <OText>Loading...</OText>
            )}
          </View>
        ) : (
          <SignInButton className={`btn btn-primary`} />
        )}
      </View>
      <Footer/>
    </ScrollView>
  );
}
