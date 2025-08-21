"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputUi from "@/components/ui/input/inputLogin";
import { CheckboxLogin } from "@/components/ui/checkbox/checkLogin";
import { Sliders } from "@/data/carrosels";
import { SchemaLogin } from "@/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth.FormDataLogin>({
    resolver: yupResolver(SchemaLogin),
  });

  const onSubmit = (data: Auth.FormDataLogin) => {
    console.log(data);
  };

  return (
    <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center  `}>
      <div className="w-full max-w-[1750px] flex ">
        <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative ">
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">logo</p>
          <Sliders />
        </section>

        <section className="w-full md:w-1/2 flex justify-center items-center h-auto flex-col">
          <div className="w-[90%]">
            <h1 className="2xl:text-5xl font-extrabold text-3xl mb-7">Ei,Olá !</h1>
            <p className="text-gray-500 text-[14px] 2xl:text-2xl font-medium">Sua segurança, nossa prioridade em cada compra.</p>

            <form className="mt-8 flex flex-col   w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col max-w-[800px]">
                <button type="button" className="relative w-[full] h-[53px] 2xl:h-[73px] border    bg-[var( --background-secondary)]text-black font-medium focus:ring-2 focus:black focus:outline-none cursor-pointer  shadow-md mb-4 max-w-[800px] hover:opacity-85">
                  <Image src="/icon/icon-google.png" alt="Google" width={32} height={32} className="absolute left-4 top-1/2 transform -translate-y-1/2" />

                  <span className="block text-center w-full text-[17px] 2xl:text-[20px]">Login com Google</span>
                </button>
              </div>

              <InputUi {...register("email")} name="email" type="email" placeholder="Email" error={errors.email?.message} className="w-full h-[53px] 2xl:h-[73px] px-4 border focus:ring-2 focus:black focus:outline-none bg-var text-[17px] 2xl:text-[21px] bg-[var(--background-secondary)] " />

              <InputUi {...register("password")} name="password" type="password" placeholder="Senha" error={errors.password?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px] " />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex justify-between items-center max-w-[800px]">
                <div className="flex items-center gap-2">
                  <CheckboxLogin />
                  <p>Lembrar-me</p>
                </div>

                <Link href="" className="text-[var(--txt-terciary)]  font-medium text-[17px] 2xl:text-[20px] text-end max-w-[800px] hover:underline">
                  Esqueceu sua senha?
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <button type="submit" className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-85  font-bold  2xl:text-[22px] transition ease-in duration-300 mt-8">
                  Entrar
                </button>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="text-center max-w-[800px] mt-9 text-[17px] 2xl:text-[20px] font-medium">
                <span>
                  Não tem uma conta?
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
