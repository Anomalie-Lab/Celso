import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { InputAuthUi } from "@/components/ui/inputs/input.auth"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/hooks/user.hook";
import { Auth } from "@/api/auth.api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormDataLogin, SchemaLogin } from "@/entities/schemas";

interface LoginFormProps {
  onAuthPageChange: (page: "Login" | "Register" | "ForgotPass") => void
}

export const LoginForm = ({ onAuthPageChange }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataLogin>({ 
    resolver: yupResolver(SchemaLogin) 
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();
  
  const onSubmit = async (data: FormDataLogin) => {
    try {
      setIsLoading(true);
      const response = await Auth.login(data);
      if (response.user) {
        setUser(response.user);
        toast.success("Login realizado com sucesso!", {
          description: "Bem-vindo de volta!",
        });
        router.push('/');
      }
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : "Verifique suas credenciais e tente novamente.";
      toast.error("Erro ao fazer login", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
            type="email"
            placeholder="seu@email.com"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
        <div className="space-y-2">
          <InputAuthUi
            type="password"
            placeholder="Sua senha"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded border-gray-300" />
          <span className="text-gray-600">Lembrar de mim</span>
        </label>
        <button 
          type="button"
          onClick={() => onAuthPageChange("ForgotPass")}
          className="text-primary hover:underline font-medium cursor-pointer"
        >
          Esqueceu a senha?
        </button>
      </div>
      <div className="pt-4 mt-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 text-base font-medium bg-primary text-white cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </div>
      <DialogFooter className="border-t border-gray-200 py-5 mt-6">
        <div className="flex items-center justify-center w-full">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <button 
              type="button"
              onClick={() => onAuthPageChange("Register")} 
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Cadastrar
            </button>
          </p>
        </div>
      </DialogFooter>
    </form>
  )
}
