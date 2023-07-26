import { useRouter } from 'next/router';
import { type LoginInput } from '../types';
import AuthForm from './AuthForm';
import { useAppStore } from '~/features/store';
import { signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);

  const submit = async (credentials: LoginInput) => {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    if (result?.ok) return router.replace('/leaves');
    if (result?.error) {
      setUiToast({ type: 'Error', message: 'Invalid Credentials' });
    }
  };

  return <AuthForm kind="login" onSubmit={submit}></AuthForm>;
};

export default Login;
