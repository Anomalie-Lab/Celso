import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Activity
} from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { metrics, topProducts, recentActivity, isLoading, error } = useDashboard();

  if (error) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600">Erro ao carregar dashboard</h3>
            <p className="text-muted-foreground">Tente recarregar a página</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const metricsConfig = [
    {
      title: "Total de Produtos",
      value: metrics?.totalProducts || 0,
      change: metrics?.productsChange || "+0%",
      trend: "up",
      icon: Package,
      color: "primary"
    },
    {
      title: "Usuários Ativos",
      value: metrics?.activeUsers || 0,
      change: metrics?.usersChange || "+0%",
      trend: "up",
      icon: Users,
      color: "success"
    },
    {
      title: "Pedidos Hoje",
      value: metrics?.todayOrders || 0,
      change: metrics?.ordersChange || "+0%",
      trend: metrics?.ordersChange?.startsWith('+') ? "up" : "down",
      icon: ShoppingCart,
      color: "warning"
    },
    {
      title: "Receita Mensal",
      value: `R$ ${metrics?.monthlyRevenue?.toLocaleString('pt-BR') || '0'}`,
      change: metrics?.revenueChange || "+0%",
      trend: "up",
      icon: DollarSign,
      color: "info"
    }
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Métricas principais */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metricsConfig.map((metric) => (
            <Card key={metric.title} className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-foreground">{metric.value}</div>
                    <div className="flex items-center text-xs">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-3 w-3 text-success mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                      )}
                      <span className={metric.trend === "up" ? "text-success" : "text-destructive"}>
                        {metric.change}
                      </span>
                      <span className="text-muted-foreground ml-1">este mês</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Atividade Recente */}
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-2 h-2 rounded-full" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-3 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'order' ? 'bg-primary' :
                          activity.type === 'product' ? 'bg-success' :
                          activity.type === 'user' ? 'bg-info' :
                          activity.type === 'alert' ? 'bg-warning' : 'bg-muted-foreground'
                        }`} />
                        <span className="text-sm text-foreground">{activity.action}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Produtos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-4 w-16 mb-1" />
                        <Skeleton className="h-3 w-8" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {topProducts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Nenhum produto encontrado</p>
                    </div>
                  ) : (
                    topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.sales} vendas</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">{product.revenue}</div>
                          <div className="flex items-center text-xs">
                            {product.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 text-success mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 text-destructive mr-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => navigate('/admin/produtos')}
              >
                <Package className="h-4 w-4 mr-2" />
                Gerenciar Produtos
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/usuarios')}
              >
                <Users className="h-4 w-4 mr-2" />
                Ver Usuários
              </Button>
              <Button variant="outline" disabled>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ver Pedidos
              </Button>
              <Button variant="outline" disabled>
                <Eye className="h-4 w-4 mr-2" />
                Relatórios
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}