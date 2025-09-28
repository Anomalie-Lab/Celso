"use client"
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SidebarMenuProps {
  title?: string;
}

export default function SidebarMenu({ title = "Informações" }: SidebarMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigationItems = [
    { 
      name: 'Sobre Nós', 
      href: '/sobre-nos', 
      active: pathname === '/sobre-nos'
    },
    { 
      name: 'Trocas e Devoluções', 
      href: '/troca-devolucao', 
      active: pathname === '/troca-devolucao'
    },
    { 
      name: 'Política de Privacidade', 
      href: '/politica-privacidade', 
      active: pathname === '/politica-privacidade'
    },
    { 
      name: 'FAQ', 
      href: '/perguntas-frequentes', 
      active: pathname === '/perguntas-frequentes'
    },
    { 
      name: 'Formas de Pagamento', 
      href: '/formas-pagamento', 
      active: pathname === '/formas-pagamento'
    }
  ];

  // Encontrar o item ativo atual
  const activeItem = navigationItems.find(item => item.active);

  return (
    <div className="lg:w-80 flex-shrink-0">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white rounded-lg shadow-xs border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => router.push(item.href)}
              className={`block w-full text-left border border-gray-100 py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer ${
                item.active 
                  ? 'bg-primary text-white border-l-4 border-primary' 
                  : 'text-gray-700 hover:bg-primary-50 hover:text-primary'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden bg-white rounded-lg shadow-xs border border-gray-200 mb-6">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {activeItem && (
              <p className="text-sm text-primary font-medium mt-1">{activeItem.name}</p>
            )}
          </div>
          {isDropdownOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        {isDropdownOpen && (
          <div className="border-t border-gray-200">
            <nav className="p-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    router.push(item.href);
                    setIsDropdownOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded-lg text-sm transition-colors cursor-pointer mb-1 ${
                    item.active 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
