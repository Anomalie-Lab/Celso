import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Produtos from "./pages/admin/Produtos";
import Usuarios from "./pages/admin/Usuarios";
import Pedidos from "./pages/admin/Pedidos";
import Notificacoes from "./pages/admin/Notificacoes";
import EmailMarketing from "./pages/admin/EmailMarketing";
import Analytics from "./pages/admin/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas do admin */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/produtos" element={
              <ProtectedRoute>
                <Produtos />
              </ProtectedRoute>
            } />
            <Route path="/admin/usuarios" element={
              <ProtectedRoute>
                <Usuarios />
              </ProtectedRoute>
            } />
            <Route path="/admin/pedidos" element={
              <ProtectedRoute>
                <Pedidos />
              </ProtectedRoute>
            } />
            <Route path="/admin/notificacoes" element={
              <ProtectedRoute>
                <Notificacoes />
              </ProtectedRoute>
            } />
            <Route path="/admin/email" element={
              <ProtectedRoute>
                <EmailMarketing />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
