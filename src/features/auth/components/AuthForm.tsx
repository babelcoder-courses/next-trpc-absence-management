import { useForm, type SubmitHandler } from 'react-hook-form';
import { type LoginInput, type RegisterInput } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as validators from '../helpers/validators';
import { capitalize } from 'lodash';
import Button from '~/features/ui/components/Button';
import FormField from '~/features/ui/components/form/FormField';
import Link from 'next/link';

export type AuthFormProps =
  | {
      kind: 'register';
      onSubmit: SubmitHandler<RegisterInput>;
    }
  | {
      kind: 'login';
      onSubmit: SubmitHandler<LoginInput>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const isRegisterForm = kind === 'register';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    typeof onSubmit extends SubmitHandler<RegisterInput>
      ? RegisterInput
      : LoginInput
  >({
    resolver: zodResolver(
      kind === 'register' ? validators.register : validators.login,
    ),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
      <h2 className="mb-4 text-center text-2xl text-primary-500">
        {capitalize(kind)}
      </h2>
      {isRegisterForm && (
        <FormField
          id="name"
          label="Name"
          placeholder="Enter your name"
          error={errors.name?.message}
          {...register('name')}
        ></FormField>
      )}
      <FormField
        id="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register('email')}
      ></FormField>
      <FormField
        id="password"
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      ></FormField>
      <div className="flex items-center justify-between">
        <Button type="submit" color="primary">
          {kind}
        </Button>
        <Link href={isRegisterForm ? '/auth/sign-in' : '/auth/sign-up'}>
          {isRegisterForm
            ? 'Already have an account?'
            : 'Do not have an account yet?'}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
