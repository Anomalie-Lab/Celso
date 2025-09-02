import { Skeleton } from "./skeleton"

export function WishlistDrawerSkeleton() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header skeleton */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      
      {/* Wishlist items skeleton */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2 mb-2" />
                <div className="flex items-center justify-between mt-2">
                  <Skeleton className="h-4 w-20" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer skeleton */}
      <div className="p-8 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        
        <div className="space-y-3">
          <Skeleton className="w-full h-12 rounded-full" />
          <Skeleton className="w-full h-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}
