import { Platform } from 'react-native';
import { OPressable } from './Overrides';
import { useLogto } from '@logto/rn';

export const SignInButton = ({ className = 'btn-nav' }: { className?: string; }) => {
  const { signIn } = useLogto();

  return (
    Platform.OS === 'web' ? (
      <OPressable onPress={async () => signIn('http://' + window.location.host + '/callback')} className={`${className}`}>
        Sign in
      </OPressable>
    ) : (
      <OPressable onPress={async () => signIn('ourcookbook://callback')} className={`${className}`}>
        Sign in
      </OPressable>
    )
  )
}

export const SignOutButton = ({ className = 'btn-nav' }: { className?: string; }) => {
  const { signOut } = useLogto();

  return (
    Platform.OS === 'web' ? (
      <OPressable onPress={async () => signOut()} className={`${className}`}>
        Sign out
      </OPressable>
    ) : (
      <OPressable onPress={async () => signIn()} className={`${className}`}>
        Sign out
      </OPressable>
    )
  )
}
