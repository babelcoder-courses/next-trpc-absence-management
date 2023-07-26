import {
  RectangleGroupIcon,
  UsersIcon,
  QueueListIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { type ComponentType, type ReactNode } from 'react';
import ProtectedResource from '~/features/auth/guards/ProtectedResource';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

interface SidebarLinkProps {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  title: string;
}

const SidebarLink = ({ href, Icon, title }: SidebarLinkProps) => {
  const router = useRouter();
  const getClassName = () => {
    const baseClass = 'relative flex justify-center rounded px-2 py-1.5';

    return router.pathname.startsWith(href)
      ? `${baseClass} bg-blue-50 text-blue-700`
      : baseClass;
  };

  return (
    <Link href={href} className={getClassName()}>
      <Icon className="w-5"></Icon>
      <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
        {title}
      </span>
    </Link>
  );
};

export interface LayoutProps {
  children: ReactNode;
}

const Admin = ({ children }: LayoutProps) => {
  const { status } = useSession();

  return (
    <div className="flex">
      <div className="flex h-screen w-16 flex-col justify-between border-r bg-white">
        <div>
          <Link href="/">
            <div className="inline-flex h-16 w-16 items-center justify-center">
              <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                <Image
                  priority
                  src="/assets/images/logo.png"
                  alt="Admin Panel"
                  width={50}
                  height={50}
                />
              </span>
            </div>
          </Link>

          <div className="border-t border-gray-100">
            <nav aria-label="Main Nav" className="flex flex-col p-2">
              <ProtectedResource roles={['ADMIN', 'MANAGER']}>
                <div className="border-b border-gray-100 py-4">
                  <SidebarLink
                    title="Dashboard"
                    href="/admin/dashboard"
                    Icon={RectangleGroupIcon}
                  ></SidebarLink>
                </div>
              </ProtectedResource>
              <ul className="space-y-1 pt-4">
                <ProtectedResource roles={['ADMIN']}>
                  <li>
                    <SidebarLink
                      title="Users"
                      href="/admin/users"
                      Icon={UsersIcon}
                    ></SidebarLink>
                  </li>
                </ProtectedResource>
                <ProtectedResource roles={['ADMIN', 'MANAGER']}>
                  <li>
                    <SidebarLink
                      title="Leaves"
                      href="/admin/leaves"
                      Icon={QueueListIcon}
                    ></SidebarLink>
                  </li>
                </ProtectedResource>
                <ProtectedResource roles={['ADMIN', 'MANAGER']}>
                  <li>
                    <SidebarLink
                      title="Announcements"
                      href="/admin/announcements"
                      Icon={ChatBubbleOvalLeftEllipsisIcon}
                    ></SidebarLink>
                  </li>
                </ProtectedResource>
                <ProtectedResource roles={['ADMIN', 'MANAGER']}>
                  <li>
                    <SidebarLink
                      title="Blog"
                      href="/admin/articles"
                      Icon={BookOpenIcon}
                    ></SidebarLink>
                  </li>
                </ProtectedResource>
              </ul>
            </nav>
          </div>
        </div>
        <ProtectedResource>
          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
            <SidebarLink
              title="Profile"
              href="/auth/profile"
              Icon={Cog8ToothIcon}
            ></SidebarLink>
            {status === 'authenticated' ? (
              <button
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => signOut()}
              >
                <ArrowRightOnRectangleIcon className="w-5"></ArrowRightOnRectangleIcon>
                <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  Sign Out
                </span>
              </button>
            ) : (
              <Link
                href="/auth/sign-in"
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <ArrowLeftOnRectangleIcon className="w-5"></ArrowLeftOnRectangleIcon>
                <span className="absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </ProtectedResource>
      </div>
      <main className="w-full p-4">{children}</main>
    </div>
  );
};

export default Admin;
