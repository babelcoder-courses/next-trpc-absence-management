import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type FloatingActionButtonProps = ComponentPropsWithRef<'button'>;

const FloatingActionButton = ({
  children,
  className,
  ...props
}: FloatingActionButtonProps) => {
  return (
    <button
      className={twMerge(
        'z-100 fixed bottom-10 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 p-0 text-white drop-shadow-lg hover:bg-blue-700 hover:drop-shadow-2xl',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default FloatingActionButton;
