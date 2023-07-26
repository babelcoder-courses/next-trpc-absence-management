import { useRouter } from 'next/router';
import { type RegisterInput } from '../types';
import AuthForm from './AuthForm';
import { api } from '~/utils/api';
import { useAppStore } from '~/features/store';

const Register = () => {
  const router = useRouter();
  const setUiToast = useAppStore((state) => state.setUiToast);
  const { mutate: register } = api.auth.register.useMutation({
    onSuccess() {
      router.replace('/auth/sign-in');
    },
    onError({ message }) {
      setUiToast({ type: 'Error', message });
    },
  });
  const submit = (credentials: RegisterInput) => {
    register(credentials);
  };

  return <AuthForm kind="register" onSubmit={submit}></AuthForm>;
};

export default Register;
