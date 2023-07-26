import { type Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import { useAppStore } from '~/features/store';
import Loading from '~/features/ui/components/Loading';

export interface ProtectedRouteProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const setUiToast = useAppStore((state) => state.setUiToast);
  const [isAllow, setIsAllow] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      setUiToast({
        type: 'Error',
        message: 'Please login before accessing this page.',
      });
      router.replace('/auth/sign-in');
      return;
    }
    if (status === 'authenticated' && !roles) return setIsAllow(true);
    if (status === 'authenticated' && roles?.includes(session.user.role)) {
      return setIsAllow(true);
    }

    setUiToast({
      type: 'Error',
      message: 'You are not allowed to access this page.',
    });
    router.replace('/forbidden');
  }, [roles, router, session?.user.role, setUiToast, status]);

  if (status === 'loading') return <Loading></Loading>;
  if (isAllow) return <>{children}</>;
  return null;
};

export default ProtectedRoute;
