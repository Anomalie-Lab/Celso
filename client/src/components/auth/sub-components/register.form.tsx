import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "@/hooks/user.hook";
import { Auth } from "@/api/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { FormDataRegister, SchemaRegister } from "@/entities/schemas";
import { AxiosError } from "axios";
import Link from "next/link";
import { getGoogleOAuthURL } from "@/utils/get-google-url";

interface RegisterFormProps {
  onAuthPageChange: (page: "Login" | "Register" | "ForgotPass") => void;
  onClose: () => void | undefined;
}

export const RegisterForm = ({ onAuthPageChange, onClose }: RegisterFormProps) => {
  const { register, handleSubmit, formState } = useForm<FormDataRegister>({ mode: "onChange", resolver: yupResolver(SchemaRegister) });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const onSubmit = async (data: FormDataRegister) => {
    try {
      setIsLoading(true);

      const response = await Auth.register({ email: data.email, fullname: data.fullname, password: data.password, phone: data.phone });
      if (response) {
        console.log(response);
        setUser(response);
        toast.success("Conta criada com sucesso!", {
          description: "Bem-vindo! Sua conta foi registrada.",
        });
        onClose();
      }
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Verifique os dados e tente novamente.";
      toast.error("Erro ao criar conta", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-2 p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 sm:space-y-4">
        <Link href={getGoogleOAuthURL()} className="w-full h-10 sm:h-12 flex items-center justify-center gap-2 sm:gap-3 border border-gray-300 hover:bg-gray-50 cursor-pointer text-xs sm:text-base rounded-md">
          <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Continuar com Google</span>
        </Link>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs sm:text-sm mt-3 sm:mt-4">
            <span className="bg-white px-2 sm:px-4 text-gray-400">ou registre-se com email</span>
          </div>
        </div>
      </div>
      <div className="space-y-2 sm:space-y-1 mt-10">
        <div className="space-y-1 sm:space-y-2">
          <InputAuthUi placeholder="Nome completo" type="text" {...register("fullname")} error={formState.errors.fullname?.message} />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <InputAuthUi placeholder="Telefone" type="text" maxLength={11} {...register("phone")} error={formState.errors.phone?.message} />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <InputAuthUi type="email" placeholder="Email" {...register("email")} error={formState.errors.email?.message} />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <InputAuthUi placeholder="Senha" type="password" {...register("password")} error={formState.errors.password?.message} />
        </div>

        <div className="space-y-1 sm:space-y-2">
          <InputAuthUi placeholder="Confirmar senha" type="password" {...register("confirm_password")} error={formState.errors.confirm_password?.message} />
        </div>

        <div className="flex items-start gap-2 mt-3 sm:mt-4">
          <input type="checkbox" className="rounded border-gray-300 mt-0.5 sm:mt-1" {...register("terms")} />
          <label className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            Eu concordo com os{" "}
            <a href="/terms" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="/politica-privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </label>
        </div>
        {formState.errors.terms && <p className="text-xs sm:text-sm text-red-500">{formState.errors.terms.message}</p>}
      </div>
      <div className="pt-3 sm:pt-4">
        <Button type="submit" disabled={isLoading} className="w-full h-12 sm:h-14 text-sm sm:text-base font-medium bg-primary text-white cursor-pointer disabled:opacity-50">
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
      </div>
      <DialogFooter className="border-t border-gray-200 py-4 sm:py-5 mt-4 sm:mt-6">
        <div className="flex items-center justify-center w-full">
          <p className="text-xs sm:text-sm text-gray-600">
            Já possui uma conta?{" "}
            <button type="button" onClick={() => onAuthPageChange("Login")} className="text-primary hover:underline font-medium cursor-pointer">
              Entrar
            </button>
          </p>
        </div>
      </DialogFooter>
    </form>
  );
};
