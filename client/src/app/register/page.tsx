"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataRegister, SchemaRegister } from "@/schemas/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { CarouselAuth } from "@/components/auth/carousel.auth";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { Checkbox } from "@/components/ui/inputs/checkbox";

export default function Register() {
  const { register, handleSubmit, formState } = useForm<FormDataRegister>({ mode: "onChange", resolver: yupResolver(SchemaRegister) });

  const onSubmit = (data: FormDataRegister) => {
    console.log(data);
  };

  return (
    <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center`}>
      <div className="w-full max-w-[1750px] flex ">
        <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative ">
          <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">logo</p>

          <CarouselAuth />
        </section>
        <section className="w-full md:w-1/2 flex justify-center items-center  flex-col ">
          <div className="w-[90%] ">
            <form className="mt-8 flex flex-col  w-full" onSubmit={handleSubmit(onSubmit)}>
              <InputAuthUi {...register("fullname")} name="fullname" type="text" placeholder="Username" error={formState.errors.fullname?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border  focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]" />

              <InputAuthUi {...register("email")} type="email" placeholder="Email" error={formState.errors.email?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border  focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]" />

              <InputAuthUi {...register("phone")} name="phone" type="text" maxLength={11} placeholder="Telefone" error={formState.errors.phone?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border  focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]" />

              <InputAuthUi {...register("password")} name="password" type="password" placeholder="Senha" error={formState.errors.password?.message} className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border  focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]" />

              <InputAuthUi
                {...register("confirm_password")}
                type="password"
                error={formState.errors.confirm_password?.message}
                name="confirm_password"
                placeholder="Confirme sua senha"
                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border  focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
              />

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
              {formState.errors.terms && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{formState.errors.terms.message}</span>}

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
