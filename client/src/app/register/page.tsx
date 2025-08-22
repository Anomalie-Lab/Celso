"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataRegister, SchemaRegister } from "@/entities/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { CarouselAuth } from "@/components/auth/carousel.auth";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { Checkbox } from "@/components/ui/inputs/checkbox";
import { Auth } from "@/api/auth.api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function Register() {
  const { register, handleSubmit, formState } = useForm<FormDataRegister>({ mode: "onChange", resolver: yupResolver(SchemaRegister) });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const onSubmit = async (data: FormDataRegister) => {
    try {
      setIsLoading(true);

      const response = await Auth.register({ email: data.email, fullname: data.fullname, password: data.password, phone: data.phone });
      if (response) {
        setUser(response);
        toast.success("Conta criada com sucesso!", {
          description: "Bem-vindo! Sua conta foi registrada.",
        });
        router.push("/");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof AxiosError ? error.response?.data.message : "Verifique os dados e tente novamente.";
      toast.error("Erro ao criar conta", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center`}>
      {/* max de 1920px */}
      <div className="w-full max-w-[1920px] flex ">
        <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative">
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">logo</p>
          <CarouselAuth />
        </section>
        <section className="w-full md:w-1/2 flex justify-center items-center  flex-col  p-3 lg:pl-0 ">
          <div className="flex justify-center items-center flex-col w-full !max-w-[500px]">
            <form className="mt-8 flex flex-col  w-full !max-w-[500px] " onSubmit={handleSubmit(onSubmit)}>
              <InputAuthUi {...register("fullname")} placeholder="Nome" name="fullname" type="text" error={formState.errors.fullname?.message} />

              <InputAuthUi {...register("email")} type="email" placeholder="Email" name="email" error={formState.errors.email?.message} />

              <InputAuthUi {...register("phone")} placeholder="Telefone" name="phone" type="text" maxLength={11} error={formState.errors.phone?.message} />

              <InputAuthUi {...register("password")} placeholder="Senha" name="password" type="password" error={formState.errors.password?.message} />

              <InputAuthUi {...register("confirm_password")} type="password" error={formState.errors.confirm_password?.message} name="confirm_password" placeholder="Confirmar senha" />

              <motion.div className="flex justify-between items-center max-w-[800px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <div className="flex items-center gap-2">
                  <Checkbox {...register("terms")} />
                  <span>
                    Aceitar{" "}
                    <Link className="text-[var(--txt-quaternary)]  hover:underline" href="/terms">
                      termos
                    </Link>{" "}
                    e{" "}
                    <Link className="text-[var(--txt-quaternary)] hover:underline" href="/conditions">
                      condições
                    </Link>
                  </span>
                </div>
              </motion.div>
              {formState.errors.terms && <span className="text-[var(--destructive)] text-sm mt-1 2xl:rounded-sm">{formState.errors.terms.message}</span>}

              <motion.div className="flex flex-col max-w-[800px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <button type="submit" className="w-full h-[53px] 2xl:h-[60px]  max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-85 font-bold   mt-8 rounded-sm" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Registrar"}
                </button>
              </motion.div>

              <motion.div className=" rounded-sm  text-center max-w-[800px] font-semibold mt-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <span>
                  Já tenho uma conta!{" "}
                  <Link className="text-[var(--txt-terciary)] font-bold" href="/login">
                    Entrar
                  </Link>
                </span>
              </motion.div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
