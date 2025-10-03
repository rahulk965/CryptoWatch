import React from 'react'

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-800 ${className}`} />
)

export const TextSkeleton: React.FC<{ width?: string; className?: string }> = ({ width = 'w-24', className = '' }) => (
  <div className={`animate-pulse rounded bg-gray-200 dark:bg-gray-800 h-3 ${width} ${className}`} />
)

export const CardSkeleton: React.FC = () => (
  <div className="rounded-xl border border-gray-200/70 bg-white p-4 shadow-sm dark:border-gray-800/70 dark:bg-gray-900">
    <div className="flex items-center gap-3">
      <Skeleton className="h-8 w-8" />
      <div className="flex-1 space-y-2">
        <TextSkeleton width="w-32" />
        <TextSkeleton width="w-16" />
      </div>
      <div className="text-right">
        <TextSkeleton width="w-20" className="ml-auto" />
        <TextSkeleton width="w-24" className="ml-auto mt-2" />
      </div>
    </div>
  </div>
)

export default Skeleton
