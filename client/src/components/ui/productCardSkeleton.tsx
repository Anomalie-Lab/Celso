import { Skeleton } from "./skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 relative w-full border border-gray-100">
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
  )
}
