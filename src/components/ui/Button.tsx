import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  id: string;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  id,
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-gold text-white hover:bg-opacity-90 shadow-sm',
    secondary: 'bg-saffron text-white hover:bg-opacity-90 shadow-sm',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3 text-lg'
  };

  return (
    <button
      id={id}
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
