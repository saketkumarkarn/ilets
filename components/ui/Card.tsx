import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={[
        'bg-white',
        'rounded-xl',
        'shadow-md',
        'hover:shadow-lg',
        'transition-shadow duration-200',
        'p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
