// Shimmer loading effect component
export function Shimmer({ className = '' }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    )
}

// Skeleton components with shimmer
export function SkeletonCard() {
    return (
        <div className="p-6 bg-white/5 rounded-lg border border-white/10">
            <Shimmer className="h-4 w-24 bg-white/10 rounded mb-4" />
            <Shimmer className="h-8 w-32 bg-white/10 rounded mb-2" />
            <Shimmer className="h-3 w-full bg-white/10 rounded" />
        </div>
    )
}

export function SkeletonTable() {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex space-x-4">
                    <Shimmer className="h-12 w-12 bg-white/10 rounded" />
                    <div className="flex-1 space-y-2">
                        <Shimmer className="h-4 w-3/4 bg-white/10 rounded" />
                        <Shimmer className="h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-2">
            {[...Array(lines)].map((_, i) => (
                <Shimmer
                    key={i}
                    className={`h-4 bg-white/10 rounded ${i === lines - 1 ? 'w-2/3' : 'w-full'
                        }`}
                />
            ))}
        </div>
    )
}
