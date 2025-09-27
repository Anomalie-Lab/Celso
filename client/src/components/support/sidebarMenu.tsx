"use client"
import { useRouter, usePathname } from "next/navigation";

interface SidebarMenuProps {
  title?: string;
}

export default function SidebarMenu({ title = "Informações" }: SidebarMenuProps) {
  const router = useRouter();
  const pathname = usePathname();

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

  return (
    <div className="lg:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-xs border border-gray-200 p-6">
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
    </div>
  );
}
