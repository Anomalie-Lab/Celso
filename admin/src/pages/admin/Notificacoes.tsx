import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useUsers } from "@/hooks/useUsers";
import { Plus, Search, MoreHorizontal, Eye, Bell, Trash2, Send } from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function Notificacoes() {
  const [searchTerm, setSearchTerm] = useState("");
  const { notifications, isLoading, create, markRead } = useNotifications();
  const { users } = useUsers();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'offer',
    title: '',
    message: '',
    users: '' as string,
  });
  const [selected, setSelected] = useState<number[]>([]);
  const allSelected = users && selected.length === users.length && users.length > 0;

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "order":
        return <Badge className="bg-primary text-primary-foreground">Pedido</Badge>;
      case "shipping":
        return <Badge className="bg-blue-500 text-white">Envio</Badge>;
      case "promotion":
        return <Badge className="bg-green-500 text-white">Promoção</Badge>;
      case "system":
        return <Badge variant="secondary">Sistema</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getReadStatusBadge = (read_at: string | null) => {
    return read_at 
      ? <Badge variant="outline">Lida</Badge>
      : <Badge className="bg-orange-500 text-white">Não Lida</Badge>;
  };

  const getNotificationStats = () => {
    return {
      total: notifications.length,
      unread: notifications.filter(n => !n.read_at).length,
      orders: notifications.filter(n => n.type === "order").length,
      promotions: notifications.filter(n => n.type === "promotion").length
    };
  };

  const stats = getNotificationStats();

  return (
    <AdminLayout title="Notificações">
      <div className="space-y-6">
        {/* Header com ações */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Gerenciar Notificações</h2>
            <p className="text-muted-foreground">
              Envie e acompanhe notificações para os usuários
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="h-4 w-4 mr-2" />
                Nova Notificação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Notificação</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Título" value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} />
                <Input placeholder="Mensagem" value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox id="all" checked={allSelected} onCheckedChange={(c)=>{
                      if (c) setSelected(users.map(u=>u.id)); else setSelected([]);
                    }} />
                    <label htmlFor="all" className="text-sm">Selecionar todos</label>
                  </div>
                  <div className="max-h-40 overflow-auto border rounded p-2 space-y-1">
                    {users.map(u => (
                      <label key={u.id} className="flex items-center gap-2 text-sm">
                        <Checkbox checked={selected.includes(u.id)} onCheckedChange={(c)=>{
                          setSelected(prev => c ? [...prev, u.id] : prev.filter(id=>id!==u.id));
                        }} />
                        <span>{u.fullname} ({u.email})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button onClick={async ()=>{
                  const dto = {
                    type: form.type,
                    title: form.title,
                    message: form.message,
                    read_at: null as any,
                    users: selected
                  };
                  await create(dto as any);
                  setOpen(false);
                }}>Enviar</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Não Lidas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{stats.unread}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.orders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Promoções
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.promotions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Card com tabela */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Lista de Notificações</CardTitle>
                <CardDescription>
                  {filteredNotifications.length} notificações encontradas
                </CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar notificações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 bg-muted/40 rounded" />
                ))}
              </div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell className="font-medium">#{notification.id}</TableCell>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{getTypeBadge(notification.type)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {notification.message}
                    </TableCell>
                    <TableCell>{getReadStatusBadge(notification.read_at)}</TableCell>
                    <TableCell>
                      {new Date(notification.created_at).toLocaleDateString('pt-BR')}
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
                          <DropdownMenuItem onClick={()=> markRead(notification.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Marcar como lida
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            Reenviar
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}