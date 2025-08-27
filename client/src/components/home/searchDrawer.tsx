"use client"
import { useState, useEffect } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { LuX, LuSearch } from "react-icons/lu";
import { useDrawer } from '@/hooks/useDrawer';
import ProductCard from '@/components/ui/productCard';
import productsData from '@/data/products.json';

interface SearchDrawerProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function SearchDrawer({ isOpen, toggleDrawer }: SearchDrawerProps) {
    useDrawer(isOpen);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productsData.products);

    useEffect(() => {
        let filtered = productsData.products;

        if (searchTerm.trim()) {
            filtered = filtered.filter(product =>
                product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product =>
                product.category === selectedCategory
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory]);

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
    };

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            size={450}
            direction='right'
            className="!bg-white drawer-panel"
            overlayClassName="drawer-overlay"
        >
            <div className="h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-800">Buscar Produtos</h2>
                    </div>
                    <button 
                        onClick={toggleDrawer}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                    >
                        <LuX className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                <div className="p-7 flex-shrink-0">
                    <div className="relative">
                        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Digite o nome do produto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 placeholder:text-gray-400 placeholder:text-sm text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                     <div className="mt-8">
                         <div className="flex flex-wrap gap-2">
                             <button
                                 onClick={() => setSelectedCategory('')}
                                 className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                     selectedCategory === '' 
                                         ? 'bg-primary text-white' 
                                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                 }`}
                             >
                                 Todos
                             </button>
                             {productsData.categories.map((category) => (
                                 <button
                                     key={category.id}
                                     onClick={() => setSelectedCategory(category.id)}
                                     className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                                         selectedCategory === category.id 
                                             ? 'bg-primary text-white' 
                                             : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                     }`}
                                 >
                                     {category.name}
                                 </button>
                             ))}
                         </div>
                     </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto drawer-content">
                    {searchTerm || selectedCategory ? (
                        <>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600">
                                    {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                                </p>
                            </div>
                            
                            {filteredProducts.length > 0 ? (
                                <div className="space-y-4">
                                    {filteredProducts.map((product) => (
                                        <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                                            <ProductCard data={product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <LuSearch className="w-16 h-16 text-gray-400 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                                        Nenhum produto encontrado
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Tente ajustar os filtros ou buscar por outro termo
                                    </p>
                                    <button 
                                        onClick={handleClearFilters}
                                        className="py-3 px-6 border border-gray-200 text-gray-600 rounded-full font-medium transition-colors text-sm hover:bg-gray-50"
                                    >
                                        Limpar Busca
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <LuSearch className="w-16 h-16 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-600 mb-3">
                                Busque por produtos
                            </h3>
                            <p className="text-gray-500 text-sm mb-6 w-3/4">
                                Digite o nome do produto ou use os filtros para encontrar o que procura
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Drawer>
    )
}
