"use client"
import { useState, useEffect } from 'react';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { LuX, LuSearch, LuLoader, LuArrowRight } from "react-icons/lu";
import { useDrawer } from '@/hooks/useDrawer';
import SearchHorizontalCard from '@/components/ui/searchHorizontalCard';
import { Products } from '@/api/products.api';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

interface SearchDrawerProps {
    isOpen: boolean
    toggleDrawer: () => void
}

export default function SearchDrawer({ isOpen, toggleDrawer }: SearchDrawerProps) {
    useDrawer(isOpen);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch categories
    const { data: categories = [], isLoading: categoriesLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: Products.getCategories,
        enabled: isOpen,
    });

    // Search products
    const { data: searchData, isLoading: searchLoading } = useQuery({
        queryKey: ['search-products', debouncedSearchTerm, selectedCategory],
        queryFn: () => Products.searchProducts({
            q: debouncedSearchTerm,
            category: selectedCategory,
            limit: 20
        }),
        enabled: (!!debouncedSearchTerm || !!selectedCategory) && isOpen,
    });

    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
    };

    const handleCategoryClick = (categoryName: string) => {
        if (selectedCategory === categoryName) {
            setSelectedCategory(''); // Desmarca se já estiver selecionada
        } else {
            setSelectedCategory(categoryName);
        }
    };

    const filteredProducts = searchData?.products || [];
    const displayedProducts = filteredProducts.slice(0, 3); // Máximo 3 produtos
    const hasMoreProducts = filteredProducts.length > 3;
    const isLoading = searchLoading || categoriesLoading;

    // Construir URL de busca
    const buildSearchUrl = () => {
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append('q', debouncedSearchTerm);
        if (selectedCategory) params.append('category', selectedCategory);
        return `/search?${params.toString()}`;
    };

    return (
        <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            size={500}
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
                
                <div className="px-7 flex-shrink-0">
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
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Categorias Populares</h3>
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
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryClick(category.name)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer capitalize ${
                                        selectedCategory === category.name 
                                            ? 'bg-primary text-white' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.name} ({category.count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between p-6 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <LuLoader className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : (debouncedSearchTerm || selectedCategory) ? (
                        <>
                            <div className="overflow-y-auto flex-1">
                                <div className="mb-4">
                                    <p className="text-sm text-gray-600">
                                        {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                
                                {filteredProducts.length > 0 ? (
                                    <div className="space-y-3">
                                        {displayedProducts.map((product) => (
                                            <SearchHorizontalCard key={product.id} data={product} />
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
                                            className="cursor-pointer py-3 px-6 border border-gray-200 text-gray-600 rounded-full font-medium transition-colors text-sm hover:bg-gray-50"
                                        >
                                            Limpar Busca
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {hasMoreProducts && (
                                <div className="border-t border-gray-100 pt-4 mt-4 flex-shrink-0">
                                    <Link 
                                        href={buildSearchUrl()}
                                        onClick={toggleDrawer}
                                        className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-600 transition-colors text-sm"
                                    >
                                        Ver todos os {filteredProducts.length} produtos
                                        <LuArrowRight className="w-4 h-4" />
                                    </Link>
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
