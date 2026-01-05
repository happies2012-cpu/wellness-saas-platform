import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'glass' | 'glass-dark'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const variants = {
            default: 'bg-white dark:bg-dark-100 border border-gray-200 dark:border-dark-200',
            glass: 'glass-card',
            'glass-dark': 'glass-card-dark',
        }

        return (
            <div
                ref={ref}
                className={cn('rounded-2xl p-6', variants[variant], className)}
                {...props}
            />
        )
    }
)

Card.displayName = 'Card'

export { Card }
