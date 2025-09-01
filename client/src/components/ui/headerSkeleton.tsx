import { Skeleton } from "./skeleton"

export function HeaderSkeleton() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo skeleton */}
          <Skeleton className="h-8 w-32" />
          
          {/* Search bar skeleton */}
          <div className="flex-1 max-w-2xl mx-8">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>
          
          {/* Navigation buttons skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
