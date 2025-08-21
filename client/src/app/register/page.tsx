"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { Inter } from 'next/font/google';
import Input from "@/components/ui/input/inputLogin";
import { CheckboxLogin } from "@/components/ui/checkbox/checkLogin";
import { Sliders } from "@/data/carrosels";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export default function Register() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: errorsRegister }
    } = useForm<Auth.FormDataRegister>();


    const onSubmit = (data: Auth.FormDataRegister) => {
        console.log(data);
    };


    const password = watch("password");

    return (
        <main className={`font-inter min-h-screen flex flex-col md:flex-row justify-center items-center`}>
            <div className="w-full max-w-[1750px] flex ">


                <section className="hidden md:flex w-1/2 h-screen items-center justify-center relative ">
                    <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">
                        logo
                    </p>

                    <Sliders />
                </section>
                <section className="w-full md:w-1/2 flex justify-center items-center  flex-col ">

                    <div className="w-[90%] ">
                        <form className="mt-8 flex flex-col  w-full" onSubmit={handleSubmit(onSubmit)}>


                            <div className="flex flex-col max-w-[800px]">
                                <Input
                                    {...register("fullName", { required: "nome é obrigatório" })}
                                    type="text"
                                    placeholder="Username"
                                    className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
                                />
                                <div className="min-h-[20px]  2xl:my-2 mt-1.5">
                                    {errorsRegister.fullName && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errorsRegister.fullName.message}</span>}
                                </div>

                            </div>

                            <div className="flex flex-col max-w-[800px]">
                                <Input
                                    {...register("email", {
                                        required: "email é obrigatório",

                                    })}
                                    type="email"
                                    placeholder="Email"
                                    className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
                                />
                                <div className="min-h-[20px]  2xl:my-2 mt-1.5">

                                    {errorsRegister.email && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px] ">{errorsRegister.email.message}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col max-w-[800px]">
                                <Input
                                    {...register("telephone", {
                                        required: "telefone é obrigatório",

                                    })}
                                    type="text"
                                    placeholder="Telefone"
                                    className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
                                />
                                <div className="min-h-[20px] 2xl:my-2 mt-1.5">

                                    {errorsRegister.telephone && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errorsRegister.telephone.message}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col max-w-[800px]">
                                <Input
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                        minLength: { value: 6, message: "Senha mínima 6 caracteres" }
                                    })}
                                    type="password"
                                    placeholder="Senha"
                                    className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
                                />
                                <div className="min-h-[20px]  2xl:my-2 mt-1.5">

                                    {errorsRegister.password && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errorsRegister.password.message}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col max-w-[800px]">
                                <Input
                                    {...register("confirmPassword", {
                                        required: "Confirmação é obrigatória",
                                        validate: value => value === password || "As senhas não coincidem"
                                    })}
                                    type="password"
                                    placeholder="Confirme sua senha"
                                    className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:black focus:outline-none bg-[var(--background-secondary)] text-[17px] 2xl:text-[21px]"
                                />
                                <div className="min-h-[5px]  2xl:my-2 mt-1.5">

                                    {errorsRegister.confirmPassword && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errorsRegister.confirmPassword.message}</span>}
                                </div>
                            </div>
                            <div className="flex justify-between items-center max-w-[800px]">
                                <div className="flex items-center gap-2">
                                    <CheckboxLogin />
                                    <span>Aceitar <Link className="text-[var(--txt-quaternary)]  hover:underline" href="#">termos</Link> e <Link className="text-[var(--txt-quaternary)] hover:underline" href="#">condições</Link></span>
                                </div>


                            </div>

                            <button
                                type="submit"
                                className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-85
                                font-bold  2xl:text-[22px] mt-8"
                            >
                                Registrar
                            </button>
                            <span className=" text-[17px] 2xl:text-[20px] text-center max-w-[800px] font-semibold mt-9">Já tenho uma conta! <Link className="text-[var(--txt-terciary)] font-bold" href='/login'>Entrar</Link></span>
                        </form>
                    </div>
                </section>

            </div>
        </main>
    );
}
