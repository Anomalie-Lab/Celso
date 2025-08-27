import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Send, Users, Calendar, CheckCircle } from "lucide-react";
import { mockUsers } from "@/data/mockData";

export default function EmailMarketing() {
  const [emailData, setEmailData] = useState({
    subject: "",
    content: "",
    recipients: "all",
    schedule: false,
    scheduleDate: "",
  });

  const [users] = useState(mockUsers);

  const handleSendEmail = () => {
    // Aqui seria implementada a lógica de envio de email
    console.log("Enviando email:", emailData);
    // Mostrar toast de sucesso
  };

  const getRecipientCount = () => {
    switch (emailData.recipients) {
      case "all":
        return users.length;
      case "active":
        return users.filter(u => u.role.name === "USER").length;
      case "admins":
        return users.filter(u => u.role.name === "ADMIN").length;
      default:
        return 0;
    }
  };

  const getEmailStats = () => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.role.name === "USER").length,
      adminUsers: users.filter(u => u.role.name === "ADMIN").length,
      campaignsSent: 12, // Mock data
      openRate: 68.5, // Mock data
    };
  };

  const stats = getEmailStats();

  return (
    <AdminLayout title="Email Marketing">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Email Marketing</h2>
            <p className="text-muted-foreground">
              Envie campanhas de email para seus usuários
            </p>
          </div>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Usuários Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.activeUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Administradores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.adminUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Campanhas Enviadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.campaignsSent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Taxa de Abertura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.openRate}%</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Formulário de Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Criar Campanha de Email
              </CardTitle>
              <CardDescription>
                Configure e envie emails para seus usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto do Email</Label>
                <Input
                  id="subject"
                  placeholder="Digite o assunto do email"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipients">Destinatários</Label>
                <Select 
                  value={emailData.recipients} 
                  onValueChange={(value) => setEmailData({ ...emailData, recipients: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os destinatários" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os usuários ({users.length})</SelectItem>
                    <SelectItem value="active">Apenas usuários ativos ({users.filter(u => u.role.name === "USER").length})</SelectItem>
                    <SelectItem value="admins">Apenas administradores ({users.filter(u => u.role.name === "ADMIN").length})</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {getRecipientCount()} destinatários selecionados
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo do Email</Label>
                <Textarea
                  id="content"
                  placeholder="Digite o conteúdo do email..."
                  rows={8}
                  value={emailData.content}
                  onChange={(e) => setEmailData({ ...emailData, content: e.target.value })}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="schedule"
                  checked={emailData.schedule}
                  onCheckedChange={(checked) => setEmailData({ ...emailData, schedule: checked as boolean })}
                />
                <Label htmlFor="schedule">Agendar envio</Label>
              </div>

              {emailData.schedule && (
                <div className="space-y-2">
                  <Label htmlFor="scheduleDate">Data e Hora do Envio</Label>
                  <Input
                    id="scheduleDate"
                    type="datetime-local"
                    value={emailData.scheduleDate}
                    onChange={(e) => setEmailData({ ...emailData, scheduleDate: e.target.value })}
                  />
                </div>
              )}

              <Button 
                onClick={handleSendEmail}
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={!emailData.subject || !emailData.content}
              >
                <Send className="h-4 w-4 mr-2" />
                {emailData.schedule ? "Agendar Envio" : "Enviar Agora"}
              </Button>
            </CardContent>
          </Card>

          {/* Preview e Histórico */}
          <div className="space-y-6">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview do Email</CardTitle>
                <CardDescription>
                  Visualize como seu email aparecerá para os destinatários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-background">
                  <div className="border-b pb-2 mb-3">
                    <h3 className="font-semibold">
                      {emailData.subject || "Assunto do Email"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      De: admin@fluxoprime.com
                    </p>
                  </div>
                  <div className="whitespace-pre-wrap text-sm">
                    {emailData.content || "Conteúdo do email aparecerá aqui..."}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Histórico Recente */}
            <Card>
              <CardHeader>
                <CardTitle>Campanhas Recentes</CardTitle>
                <CardDescription>
                  Últimas campanhas enviadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Promoção de Fim de Ano</p>
                      <p className="text-sm text-muted-foreground">Enviado há 2 dias</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enviado
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Newsletter Semanal</p>
                      <p className="text-sm text-muted-foreground">Enviado há 1 semana</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enviado
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Boas-vindas aos Novos Usuários</p>
                      <p className="text-sm text-muted-foreground">Enviado há 2 semanas</p>
                    </div>
                    <Badge className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enviado
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}