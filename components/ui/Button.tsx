import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'white';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-700 text-white border-2 border-blue-700 hover:bg-blue-800 hover:border-blue-800 active:bg-blue-900 focus-visible:ring-blue-500',
  secondary:
    'bg-transparent text-blue-700 border-2 border-blue-700 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500',
  white:
    'bg-white text-blue-700 border-2 border-white hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-white',
};

export default function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  type = 'button',
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center',
        'px-5 py-2.5',
        'text-sm font-semibold',
        'rounded-lg',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
