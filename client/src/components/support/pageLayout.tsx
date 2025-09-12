"use client"

import SidebarMenu from "./sidebarMenu";

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  sidebarTitle?: string;
}

export default function PageLayout({ 
  children, 
  title, 
  sidebarTitle = "Suporte"
}: PageLayoutProps) {

  return (
    <div className="min-h-screen mt-20 sm:mt-32 lg:mt-40">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <SidebarMenu title={sidebarTitle} />
          <div className="flex-1">
            <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 min-h-full">
              <h1 className="text-md md:text-xl font-bold text-gray-900 mb-6 sm:mb-8 text-center md:text-left">
                {title}
              </h1>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
