import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputAuthUi } from "@/components/ui/inputs/input.auth"
import { FcGoogle } from "react-icons/fc"

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
        description: "Faça login para acessar sua conta e continuar suas compras.",
    }, ForgotPass: {
        title: "Redefinir senha",
        description: "Faça login para acessar sua conta e continuar suas compras.",
    }
}


export function LoginAuth({isOpen, toggleDialog, authPage, onAuthPageChange}: DialogProps) {

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
        <form className="space-y-2">
          <div className="space-y-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continuar com Google</span>
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm mt-4">
                <span className="bg-white px-4 text-gray-400">ou entre com email</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 mt-6">
            <div className="space-y-2">
              <InputAuthUi 
                name="email" 
                type="email"
                placeholder="seu@email.com"
              />
            </div>
            <div className="space-y-2">
              <InputAuthUi 
                name="password" 
                type="password"
                placeholder="Sua senha"
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-gray-600">Lembrar de mim</span>
            </label>
            <button 
              onClick={() => onAuthPageChange?.("ForgotPass")}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className="pt-4 mt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium bg-primary text-white cursor-pointer"
            >
              Entrar
            </Button>
          </div>
          <DialogFooter className="border-t border-gray-200 py-5 mt-6">
            <div className="flex items-center justify-center w-full">
                <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <button onClick={() => onAuthPageChange?.("Register")} className="text-primary hover:underline font-medium cursor-pointer">
                    Cadastrar
                </button>
                </p>
            </div>
          </DialogFooter>
        </form>
        )}

        {authPage === "Register" && (
        <form className="space-y-2">
          <div className="space-y-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-12 flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 cursor-pointer"
            >
              <FcGoogle className="w-5 h-5" />
              <span>Continuar com Google</span>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm mt-4">
                <span className="bg-white px-4 text-gray-400">ou registre-se com email</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 mt-6">
            <div className="space-y-2">
            <InputAuthUi placeholder="Nome" name="fullname" type="text" />
            </div>

            <div className="space-y-2">
            <InputAuthUi placeholder="Telefone" name="phone" type="text" maxLength={11} />
            </div>

            <div className="space-y-2">
            <InputAuthUi type="email" placeholder="Email" name="email" />
            </div>

            <div className="space-y-2">
            <InputAuthUi placeholder="Senha" name="password" type="password" />
            </div>
          </div>
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium bg-primary text-white cursor-pointer"
            >
              Entrar
            </Button>
          </div>
          <DialogFooter className="border-t border-gray-200 py-5 mt-6">
            <div className="flex items-center justify-center w-full">
                <p className="text-sm text-gray-600">
                Já possui uma conta?{" "}
                <button onClick={() => onAuthPageChange?.("Login")} className="text-primary hover:underline font-medium cursor-pointer">
                    Entrar
                </button>
                </p>
            </div>
          </DialogFooter>
        </form>
        )}

        {authPage === "ForgotPass" && (
        <form className="space-y-2">
          <div className="space-y-1 mt-6">
            <div className="space-y-2">
              <InputAuthUi 
                name="email" 
                type="email"
                placeholder="seu@email.com"
              />
            </div>
          </div>
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full h-14 text-base font-medium bg-primary text-white cursor-pointer"
            >
              Enviar link de redefinição
            </Button>
          </div>
          <DialogFooter className="border-t border-gray-200 py-5 mt-6">
            <div className="flex items-center justify-center w-full">
                <p className="text-sm text-gray-600">
                Lembrou sua senha?{" "}
                <button 
                  onClick={() => onAuthPageChange?.("Login")}
                  className="text-primary hover:underline font-medium cursor-pointer"
                >
                    Voltar ao login
                </button>
                </p>
            </div>
          </DialogFooter>
        </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
