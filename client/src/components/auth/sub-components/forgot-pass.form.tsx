import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { InputAuthUi } from "@/components/ui/inputs/input.auth"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Auth } from "@/api/auth.api";
import { toast } from "sonner";
import { useState } from "react";
import { FormDataForgotPassword, SchemaForgotPassword } from "@/entities/schemas";

interface ForgotPassFormProps {
  onAuthPageChange: (page: "Login" | "Register" | "ForgotPass") => void
}

export const ForgotPassForm = ({ onAuthPageChange }: ForgotPassFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDataForgotPassword>({ 
    resolver: yupResolver(SchemaForgotPassword) 
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async (data: FormDataForgotPassword) => {
    try {
      setIsLoading(true);
      const response = await Auth.forgotPassword(data);
      
      if (response === 200 || response === 201) {
        toast.success("Email enviado com sucesso!", {
          description: "Verifique sua caixa de entrada para redefinir sua senha.",
        });
        onAuthPageChange("Login");
      }
    } catch (error: unknown) {
      console.log(error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao enviar email. Tente novamente.";
      toast.error("Erro ao enviar email", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-1 mt-6">
        <div className="space-y-2">
          <InputAuthUi 
            type="email"
            placeholder="Email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>
      </div>
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 text-base font-medium bg-primary text-white cursor-pointer disabled:opacity-50"
        >
          {isLoading ? "Enviando..." : "Enviar link de redefinição"}
        </Button>
      </div>
      <DialogFooter className="border-t border-gray-200 py-5 mt-6">
        <div className="flex items-center justify-center w-full">
          <p className="text-sm text-gray-600">
            Lembrou sua senha?{" "}
            <button 
              type="button"
              onClick={() => onAuthPageChange("Login")}
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Voltar ao login
            </button>
          </p>
        </div>
      </DialogFooter>
    </form>
  )
}
