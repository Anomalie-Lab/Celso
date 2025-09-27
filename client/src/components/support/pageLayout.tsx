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
    <div className="min-h-screen mt-40">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <SidebarMenu title={sidebarTitle} />
          <div className="flex-1">
            <div className="bg-white rounded-lg p-8 min-h-full">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">
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
