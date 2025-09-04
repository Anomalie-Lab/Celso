import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AnalyticsSummary } from "@/components/admin/AnalyticsSummary";
import { ProductAnalyticsTable } from "@/components/admin/ProductAnalyticsTable";
import { AnalyticsFilters } from "@/components/admin/AnalyticsFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Table,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  Eye,
  Heart,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import { useAnalyticsByDateRange } from "@/hooks/useAnalytics";

export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState("summary");
  const [filters, setFilters] = useState({
    days: 30,
    startDate: undefined as string | undefined,
    endDate: undefined as string | undefined,
  });

  const { data: analyticsData, isLoading } = useAnalyticsByDateRange(
    filters.startDate,
    filters.endDate,
    filters.days
  );

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const exportData = () => {
    if (!analyticsData) return;
    
    const csvContent = [
      ['Data', 'Produto', 'Ação', 'Usuário', 'Fonte', 'IP', 'User Agent'].join(','),
      ...analyticsData.map(item => [
        new Date(item.created_at).toLocaleDateString('pt-BR'),
        item.product?.title || 'N/A',
        item.action,
        item.user?.name || 'Anônimo',
        item.source || 'N/A',
        item.ip_address || 'N/A',
        `"${item.user_agent || 'N/A'}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `analytics-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        return <TrendingUp className="h-4 w-4" />;
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

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* Header com filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">
              Análise detalhada do comportamento dos usuários
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportData} disabled={!analyticsData}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AnalyticsFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </CardContent>
        </Card>

        {/* Tabs de conteúdo */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Resumo
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Table className="h-4 w-4" />
              Detalhes
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-6">
            <AnalyticsSummary days={filters.days} />
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <ProductAnalyticsTable
              data={analyticsData || []}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Insights de comportamento */}
              <Card>
                <CardHeader>
                  <CardTitle>Comportamento dos Usuários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Ações mais comuns:</span>
                          <div className="flex gap-2">
                            {['view', 'wishlist_add', 'cart_add', 'purchase'].map(action => {
                              const count = analyticsData.filter(item => item.action === action).length;
                              const percentage = analyticsData.length > 0 ? (count / analyticsData.length) * 100 : 0;
                              return (
                                <Badge key={action} className={getActionColor(action)}>
                                  {getActionIcon(action)}
                                  <span className="ml-1">{percentage.toFixed(1)}%</span>
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Top 5 Produtos:</div>
                          {analyticsData
                            .reduce((acc, item) => {
                              const existing = acc.find(p => p.product_id === item.product_id);
                              if (existing) {
                                existing.count++;
                              } else {
                                acc.push({ product_id: item.product_id, product: item.product, count: 1 });
                              }
                              return acc;
                            }, [] as any[])
                            .sort((a, b) => b.count - a.count)
                            .slice(0, 5)
                            .map((item, index) => (
                              <div key={item.product_id} className="flex items-center justify-between text-sm">
                                <span>{index + 1}. {item.product?.title || 'Produto não encontrado'}</span>
                                <Badge variant="secondary">{item.count} ações</Badge>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Insights temporais */}
              <Card>
                <CardHeader>
                  <CardTitle>Padrões Temporais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData && (
                      <>
                        <div className="text-sm">
                          <div className="font-medium mb-2">Atividade por hora do dia:</div>
                          <div className="grid grid-cols-4 gap-2 text-xs">
                            {Array.from({ length: 24 }, (_, hour) => {
                              const count = analyticsData.filter(item => 
                                new Date(item.created_at).getHours() === hour
                              ).length;
                              return (
                                <div key={hour} className="text-center">
                                  <div className="font-mono">{hour.toString().padStart(2, '0')}h</div>
                                  <div className="text-muted-foreground">{count}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="text-sm">
                          <div className="font-medium mb-2">Atividade por dia da semana:</div>
                          <div className="space-y-1">
                            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => {
                              const count = analyticsData.filter(item => 
                                new Date(item.created_at).getDay() === index
                              ).length;
                              return (
                                <div key={day} className="flex items-center justify-between">
                                  <span>{day}</span>
                                  <Badge variant="outline">{count}</Badge>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
