import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductForm } from "@/components/admin/ProductForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { ProductWithRelations, ProductFormData } from "@/types/database";

export default function Produtos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<ProductWithRelations | null>(null);

  const {
    products,
    isLoading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    isCreating,
    isUpdating,
    isDeleting,
  } = useProducts();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.categories && 
     Array.isArray(product.categories) && 
     product.categories.some((cat: string) => cat.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Sem Estoque</Badge>;
    }
    if (stock < 10) {
      return <Badge variant="secondary">Estoque Baixo</Badge>;
    }
    return <Badge className="bg-green-500 text-white">Ativo</Badge>;
  };

  const handleCreateProduct = (data: ProductFormData) => {
    createProduct(data);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (data: ProductFormData) => {
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, data });
      setEditingProduct(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteProduct = () => {
    if (deletingProduct) {
      deleteProduct(deletingProduct.id);
      setDeletingProduct(null);
    }
  };

  const openEditForm = (product: ProductWithRelations) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  if (error) {
    return (
      <AdminLayout title="Produtos">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Erro ao carregar produtos</h3>
            <p className="text-muted-foreground">Tente recarregar a página</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Produtos">
      <div className="space-y-6">
        {/* Header com ações */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gerenciar Produtos</h2>
            <p className="text-muted-foreground">
              Adicione, edite e gerencie o catálogo de produtos
            </p>
          </div>
          <Button 
            className="bg-gradient-primary hover:opacity-90"
            onClick={() => setIsFormOpen(true)}
            disabled={isCreating}
          >
            {isCreating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            Novo Produto
          </Button>
        </div>

        {/* Card com tabela */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Lista de Produtos</CardTitle>
                <CardDescription>
                  {filteredProducts.length} produtos encontrados
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Marca</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Estoque</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        {searchTerm ? "Nenhum produto encontrado" : "Nenhum produto cadastrado"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>
                          {product.categories && Array.isArray(product.categories) && product.categories.length > 0 
                            ? product.categories[0] 
                            : "N/A"
                          }
                        </TableCell>
                        <TableCell>R$ {Number(product.price).toFixed(2)}</TableCell>
                        <TableCell>{product.stock} un.</TableCell>
                        <TableCell>
                          {getStatusBadge("ativo", product.stock)}
                        </TableCell>
                        <TableCell>
                          {new Date(product.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openEditForm(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => setDeletingProduct(product)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Product Form */}
        <ProductForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
          product={editingProduct}
          isLoading={isCreating || isUpdating}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir o produto "{deletingProduct?.title}"? 
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteProduct}
                disabled={isDeleting}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  "Excluir"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}