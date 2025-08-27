import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LoginForm, RegisterForm, ForgotPassForm } from "./sub-components";

interface DialogProps {
    isOpen: boolean
    authPage: "Login" | "Register" | "ForgotPass",
    toggleDialog?: () => void
    onAuthPageChange?: (page: "Login" | "Register" | "ForgotPass") => void
}

const authPages = {
    Login: {
        title: "Entrar na sua conta",
        description: "Faça login para acessar sua conta e continuar suas compras.",
    },
    Register: {
        title: "Criar uma conta",
        description: "Crie sua conta para acessar todas as funcionalidades da nossa loja.",
    }, 
    ForgotPass: {
        title: "Redefinir senha",
        description: "Digite seu email para receber um link de redefinição de senha.",
    }
}



export function ModalAuth({isOpen, toggleDialog, authPage, onAuthPageChange}: DialogProps) {
  const handleAuthPageChange = (page: "Login" | "Register" | "ForgotPass") => {
    onAuthPageChange?.(page);
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[600px] p-12">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-semibold">{authPages[authPage].title}</DialogTitle>
          <DialogDescription className="text-gray-600">
          {authPages[authPage].description}
          </DialogDescription>
        </DialogHeader>

        {authPage === "Login" && (
          <LoginForm onAuthPageChange={handleAuthPageChange} />
        )}

        {authPage === "Register" && (
          <RegisterForm onAuthPageChange={handleAuthPageChange} />
        )}

        {authPage === "ForgotPass" && (
          <ForgotPassForm onAuthPageChange={handleAuthPageChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
