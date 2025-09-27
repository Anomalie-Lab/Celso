"use client";

export function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Galeria Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Informações Skeleton */}
          <div className="space-y-6">
            <div>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>

            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="flex space-x-2">
                {[1, 2].map((i) => (
                  <div key={i} className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="flex space-x-3">
                <div className="h-10 bg-gray-200 rounded w-10 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-16 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-10 animate-pulse"></div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mb-3"></div>
              <div className="flex space-x-2">
                <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse"></div>
                <div className="h-9 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex space-x-3">
                <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded flex-1 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
