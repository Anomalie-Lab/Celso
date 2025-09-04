import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Heart,
  ShoppingCart,
  DollarSign,
  Search,
  MoreHorizontal,
  User,
  Globe,
  Calendar,
  Filter
} from "lucide-react";
import { ProductAnalytics } from "@/hooks/useAnalytics";

interface ProductAnalyticsTableProps {
  data: ProductAnalytics[];
  isLoading: boolean;
}

export function ProductAnalyticsTable({ data, isLoading }: ProductAnalyticsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'view':
        return <Eye className="h-4 w-4" />;
      case 'wishlist_add':
        return <Heart className="h-4 w-4" />;
      case 'cart_add':
        return <ShoppingCart className="h-4 w-4" />;
      case 'purchase':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view':
        return 'bg-blue-100 text-blue-800';
      case 'wishlist_add':
        return 'bg-pink-100 text-pink-800';
      case 'cart_add':
        return 'bg-green-100 text-green-800';
      case 'purchase':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'view':
        return 'Visualização';
      case 'wishlist_add':
        return 'Adicionado à Lista';
      case 'cart_add':
        return 'Adicionado ao Carrinho';
      case 'purchase':
        return 'Compra';
      default:
        return action;
    }
  };

  const filteredData = data.filter(item => {
    const matchesSearch = 
      item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === "all" || item.action === actionFilter;
    
    return matchesSearch && matchesAction;
  });

  const uniqueActions = Array.from(new Set(data.map(item => item.action)));

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Eventos de Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos de Analytics</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por produto, usuário ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Ação: {actionFilter === "all" ? "Todas" : getActionLabel(actionFilter)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filtrar por ação</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActionFilter("all")}>
                  Todas as ações
                </DropdownMenuItem>
                {uniqueActions.map(action => (
                  <DropdownMenuItem key={action} onClick={() => setActionFilter(action)}>
                    <div className="flex items-center gap-2">
                      {getActionIcon(action)}
                      {getActionLabel(action)}
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Ação</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Fonte</TableHead>
                <TableHead>IP</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Nenhum evento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm">
                            {new Date(item.created_at).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(item.created_at).toLocaleTimeString('pt-BR')}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {item.product?.title || 'Produto não encontrado'}
                        </div>
                        {item.product?.price && (
                          <div className="text-sm text-muted-foreground">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(item.product.price)}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(item.action)}>
                        <div className="flex items-center gap-1">
                          {getActionIcon(item.action)}
                          {getActionLabel(item.action)}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.user ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">{item.user.fullname}</div>
                            <div className="text-xs text-muted-foreground">{item.user.email}</div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Anônimo</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.source && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{item.source}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono text-muted-foreground">
                        {item.ip_address || 'N/A'}
                      </span>
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
                            Ver detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Ver produto
                          </DropdownMenuItem>
                          {item.user && (
                            <DropdownMenuItem>
                              Ver usuário
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {filteredData.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredData.length} de {data.length} eventos
          </div>
        )}
      </CardContent>
    </Card>
  );
}
