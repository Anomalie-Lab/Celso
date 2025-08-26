"use client"
import { useState } from "react";
import AccountSidebar from "@/components/account/accountSidebar";;
import ResumeTab from "@/components/account/resumeTab";
import OrdersTab from "@/components/account/ordersTab";
import WishesTab from "@/components/account/wishesTab";
import AddressTab from "@/components/account/addressTab";
import NewsletterTab from "@/components/account/newsletterTab";

export default function MinhaConta() {
  const [activeTab, setActiveTab] = useState("resumo");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "resumo":
        return <ResumeTab/>;
      case "pedidos":
        return <OrdersTab/>;
      case "desejos":
        return <WishesTab />;
      case "enderecos":
        return <AddressTab />;
      case "newsletter":
        return <NewsletterTab/>;
      default:
        return <ResumeTab />;
    }
  };

  return (
    <div className="bg-background">
      <div className="bg-white h-[1200px] flex justify-center items-center">
        <main className="container h-full flex gap-20 mx-auto px-4 py-24 bg-white">
            <div className="lg:w-80 flex-shrink-0">
                <AccountSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
            <div className="flex-1">
                {renderActiveTab()}
            </div>
        </main>
      </div>
    </div>
  );
}