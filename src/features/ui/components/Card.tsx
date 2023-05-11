import Image from 'next/image';
import { type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type CardProps = {
  className?: string;
  children: ReactNode;
} & (
  | {
      image: string;
      alt: string;
    }
  | {
      image?: never;
      alt?: never;
    }
);

export const Card = ({ image, alt, className, children }: CardProps) => {
  return (
    <div
      className={twMerge(
        'h-full rounded-lg border border-gray-200 bg-white shadow',
        className,
      )}
    >
      {image && (
        <div className="relative h-48 w-full object-contain">
          <Image src={image} alt={alt} fill className="rounded-t-lg"></Image>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;
