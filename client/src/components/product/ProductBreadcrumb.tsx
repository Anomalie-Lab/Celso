"use client";

import Link from "next/link";

interface ProductBreadcrumbProps {
  productTitle: string;
}

export function ProductBreadcrumb({ productTitle }: ProductBreadcrumbProps) {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/search" className="hover:text-gray-700">
            Produtos
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{productTitle}</span>
        </nav>
      </div>
    </div>
  );
}
