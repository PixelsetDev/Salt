import "./../global.css";
import { Text, View, ScrollView } from "react-native";
import Navbar, { Footer } from '../components/Commons';
import { useLogto } from '@logto/rn';
import { SignInButton } from '../components/auth/Auth';
import { OLink, OText } from '../components/Overrides';
import { useUser } from '../components/auth/UserProvider';

export default function App() {
  const { isAuthenticated } = useLogto();
  const { user } = useUser();

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
        </View>
      </View>

      <View className="p-std gap-std body">
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
