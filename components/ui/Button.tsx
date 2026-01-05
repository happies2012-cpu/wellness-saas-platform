import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'premium' | 'outline' | 'ghost' | 'destructive'
    size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'md', ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none'

        const variants = {
            default: 'bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg',
            premium: 'btn-premium',
            outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
            ghost: 'hover:bg-white/10',
            destructive: 'bg-red-500 text-white hover:bg-red-600',
        }

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
        }

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            />
        )
    }
)

Button.displayName = 'Button'

export { Button }
