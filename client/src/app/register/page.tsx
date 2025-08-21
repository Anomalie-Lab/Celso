"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import InputUi from "@/components/ui/input/inputLogin";
import { CheckboxLogin } from "@/components/ui/checkbox/checkLogin";
import { Sliders } from "@/data/carrosels";
import { SchemaRegister } from "@/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm<Auth.FormDataRegister>({
    mode: "onChange",
    resolver: yupResolver(SchemaRegister),
  });

  const onSubmit = (data: Auth.FormDataRegister) => {
    console.log(data);
  };

  return (
    <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center`}>
      <div className="w-full max-w-[1750px] flex ">
        <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative ">
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">logo</p>

          <Sliders />
        </section>
        <section className="w-full md:w-1/2 flex justify-center items-center  flex-col ">
          <div className="w-[90%] ">
            <form className="mt-8 flex flex-col  w-full" onSubmit={handleSubmit(onSubmit)}>
              <InputUi
                {...register("fullName")}
                name="fullName"
                type="text"
                placeholder="Username"
                error={errorsRegister.fullName?.message}
                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
              />

              <InputUi {...register("email")} type="email" placeholder="Email" error={errorsRegister.email?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]" />

              <InputUi
                {...register("telephone")}
                name="telephone"
                type="text"
                maxLength={11}
                placeholder="Telefone"
                error={errorsRegister.telephone?.message}
                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
              />

              <InputUi
                {...register("password")}
                name="password"
                type="password"
                placeholder="Senha"
                error={errorsRegister.password?.message}
                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
              />

              <InputUi
                {...register("confirmPassword")}
                type="password"
                error={errorsRegister.confirmPassword?.message}
                name="confirmPassword"
                placeholder="Confirme sua senha"
                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
              />

              <motion.div className="flex justify-between items-center max-w-[800px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <div className="flex items-center gap-2">
                  <CheckboxLogin {...register("terms")} />
                  <span>
                    Aceitar{" "}
                    <Link className="text-[var(--txt-quaternary)]  hover:underline" href="#">
                      termos
                    </Link>{" "}
                    e{" "}
                    <Link className="text-[var(--txt-quaternary)] hover:underline" href="#">
                      condições
                    </Link>
                  </span>
                </div>
              </motion.div>
              {errorsRegister.terms && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errorsRegister.terms.message}</span>}

              <motion.div className="flex flex-col max-w-[800px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
                <button
                  type="submit"
                  className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-85
                                font-bold  2xl:text-[22px] mt-8"
                >
                  Registrar
                </button>
              </motion.div>

              <motion.div className=" text-[17px] 2xl:text-[20px] text-center max-w-[800px] font-semibold mt-9" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
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
