import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Eye,
  Heart,
  ShoppingCart,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Activity
} from "lucide-react";
import { useAnalyticsSummary } from "@/hooks/useAnalytics";

interface AnalyticsSummaryProps {
  days?: number;
}

export function AnalyticsSummary({ days = 30 }: AnalyticsSummaryProps) {
  const { data: analytics, isLoading, error } = useAnalyticsSummary(days);

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-600">
            Erro ao carregar analytics
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) return null;

  const { summary, topProducts, actionStats } = analytics;

  const metrics = [
    {
      label: "Visualizações",
      value: summary.totalViews.toLocaleString('pt-BR'),
      icon: Eye,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Lista de Desejos",
      value: summary.totalWishlist.toLocaleString('pt-BR'),
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      label: "Adições ao Carrinho",
      value: summary.totalCart.toLocaleString('pt-BR'),
      icon: ShoppingCart,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Compras",
      value: summary.totalPurchases.toLocaleString('pt-BR'),
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  const conversionMetrics = [
    {
      label: "Taxa de Conversão",
      value: `${summary.conversionRate.toFixed(2)}%`,
      description: "Visualizações → Compras",
    },
    {
      label: "Taxa de Wishlist",
      value: `${summary.wishlistRate.toFixed(2)}%`,
      description: "Visualizações → Wishlist",
    },
    {
      label: "Taxa de Carrinho",
      value: `${summary.cartRate.toFixed(2)}%`,
      description: "Visualizações → Carrinho",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Métricas principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Analytics - Últimos {days} dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Taxas de conversão */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Taxas de Conversão
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {conversionMetrics.map((metric, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {metric.value}
                </div>
                <div className="text-sm font-medium">{metric.label}</div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top produtos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Produtos Mais Visualizados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.slice(0, 5).map((item, index) => (
              <div key={item.product_id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{item.product?.title || 'Produto não encontrado'}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.product?.price ? 
                        new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.product.price) : 
                        'Preço não disponível'
                      }
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">
                  {item._count.product_id} visualizações
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas por ação */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Estatísticas por Ação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {actionStats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-2xl font-bold">
                  {stat._count.action.toLocaleString('pt-BR')}
                </div>
                <div className="text-sm font-medium capitalize">
                  {stat.action.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
