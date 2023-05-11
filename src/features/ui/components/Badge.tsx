import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warn'
    | 'info'
    | 'default';
  children: ReactNode;
  className?: string;
}

const Badge = ({ color = 'default', children, className }: BadgeProps) => {
  const colorClass = {
    primary: 'bg-primary-500 hover:bg-primary-700 focus:bg-primary-700',
    secondary: 'bg-secondary-500 hover:bg-secondary-700 focus:bg-secondary-700',
    success: 'bg-success-500 hover:bg-success-700 focus:bg-success-700',
    danger: 'bg-danger-500 hover:bg-danger-700 focus:bg-danger-700',
    warn: 'bg-warn-500 hover:bg-warn-700 focus:bg-warn-700',
    info: 'bg-info-500 hover:bg-info-700 focus:bg-info-700',
    default: 'bg-neutral-500 hover:bg-neutral-700 focus:bg-neutral-700',
  }[color];

  return (
    <span
      className={twMerge(
        'rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-white',
        colorClass,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
