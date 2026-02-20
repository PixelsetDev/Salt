import { OPressable } from '../Overrides';
import { useLogto } from '@logto/rn';
import { getSignInRedirectUrl } from '../../utils/auth';

export const SignInButton = ({ className = 'btn-nav' }: { className?: string; }) => {
  const { signIn } = useLogto();

  return (
    <OPressable onPress={async () => signIn(getSignInRedirectUrl())} className={`${className}`}>
      Sign in
    </OPressable>
  )
}

export const SignOutButton = ({ className = 'btn-nav' }: { className?: string; }) => {
  const { signOut } = useLogto();

  return (
    <OPressable onPress={async () => signOut()} className={`${className}`}>
      Sign out
    </OPressable>
  )
}