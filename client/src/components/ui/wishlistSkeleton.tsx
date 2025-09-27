import { Skeleton } from "./skeleton"

export function WishlistSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>

      {/* Actions bar skeleton */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Products grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            {/* Image skeleton */}
            <div className="relative h-48 bg-gray-100">
              <Skeleton className="w-full h-full" />
              <Skeleton className="absolute top-3 right-3 w-8 h-8 rounded-full" />
            </div>

            <div className="p-4">
              {/* Title and remove button */}
              <div className="flex items-start justify-between mb-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="w-6 h-6" />
              </div>

              {/* Rating skeleton */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Skeleton key={star} className="w-3 h-3" />
                  ))}
                </div>
                <Skeleton className="h-3 w-16" />
              </div>

              {/* Price skeleton */}
              <div className="flex items-center gap-2 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Add to cart button skeleton */}
              <Skeleton className="w-full h-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
