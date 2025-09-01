import { Skeleton } from "./skeleton"

export function SearchSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-96" />
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar skeleton */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <Skeleton className="h-6 w-32 mb-6" />
              
              {/* Category filters */}
              <div className="space-y-4 mb-6">
                <Skeleton className="h-5 w-24" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>

              {/* Price range */}
              <div className="space-y-4 mb-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              {/* Brand filters */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="flex-1">
            {/* Toolbar skeleton */}
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-4 w-32" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-lg p-4 relative border border-gray-100">
                  {/* Badge skeleton */}
                  <Skeleton className="absolute top-3 left-3 w-16 h-5 z-10" />
                  
                  {/* Heart button skeleton */}
                  <Skeleton className="absolute top-3 right-3 w-8 h-8 rounded-full z-10" />
                  
                  {/* Image skeleton */}
                  <div className="relative mb-4">
                    <Skeleton className="w-full h-48 rounded-lg" />
                  </div>
                  
                  {/* Add to cart button skeleton */}
                  <Skeleton className="w-full h-12 rounded-lg mb-4" />
                  
                  {/* Title skeleton */}
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  
                  {/* Brand skeleton */}
                  <Skeleton className="h-3 w-1/2 mb-2" />
                  
                  {/* Price skeleton */}
                  <div className="space-y-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
                <Skeleton className="h-10 w-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
