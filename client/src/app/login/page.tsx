"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataLogin, SchemaLogin } from "@/entities/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { CarouselAuth } from "@/components/auth/carousel.auth";
import { Checkbox } from "@/components/ui/inputs/checkbox";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { Auth } from "@/api/auth.api";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/user.hook";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function Login() {
  const { register, handleSubmit, formState } = useForm<FormDataLogin>({ resolver: yupResolver(SchemaLogin) });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  
  const onSubmit = async (data: FormDataLogin) => {
    try {
      setIsLoading(true);
      const response = await Auth.login(data);
      if (response.user) {
        setUser(response.user);
        toast.success("Login realizado com sucesso!", {
          description: "Bem-vindo de volta!",
        });
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
    <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center  `}>
      {/* max de 1920px */}
      <div className="w-full max-w-[1920px] flex ">
        <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative">
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">logo</p>
          <CarouselAuth />
        </section>

        <section className="w-full md:w-1/2 flex justify-center items-center h-auto flex-col p-3 lg:pl-0">
          <div className="flex justify-center items-center flex-col w-full !max-w-[500px]">
            <div className="w-full">
              <h1 className="2xl:text-5xl font-extrabold text-3xl mb-7">Ei, Olá !</h1>
              <p className="text-gray-500 text-[14px] 2xl:text-[20px] font-medium">Sua segurança, nossa prioridade em cada compra.</p>
            </div>
            <form className="mt-8 flex flex-col w-full !max-w-[500px] " onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col ">
                <button type="button" className="relative w-[full] h-[53px] 2xl:h-[60px]  border border-gray-300 bg-[var( --background-secondary)]text-black font-medium focus:ring-2 focus:black focus:outline-none cursor-pointer   mb-7 hover:opacity-85 rounded-sm">
                  <FcGoogle size={35} className="absolute left-4 top-1/2 transform -translate-y-1/2" />

                  <span className="block text-center w-full ">Entrar com google</span>
                </button>
              </div>

              <InputAuthUi {...register("email")} name="email" type="email" placeholder="Email" error={formState.errors.email?.message} />

              <InputAuthUi {...register("password")} name="password" type="password" placeholder="Senha" error={formState.errors.password?.message} />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox />
                  <p>Lembrar-me</p>
                </div>

                <Link href="" className="text-[var(--txt-terciary)]  font-medium   text-end max-w-[800px] hover:underline">
                  Esqueceu sua senha?
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <button type="submit" className="w-full h-[53px] 2xl:h-[60px]  px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-85  font-bold   transition ease-in duration-300 mt-8 rounded-sm" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Entrar"}
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="text-center max-w-[800px] mt-9 font-medium">
                <span>
                  Não tem uma conta?{" "}
                  <Link className="text-[var(--txt-terciary)]  font-bold" href="/register">
                    Registrar
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
