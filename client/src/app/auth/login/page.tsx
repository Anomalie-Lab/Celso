"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "@/types/FormData";
import { Inter } from 'next/font/google';
import Input from "@/components/ui/input";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors: errorsRegister }
    } = useForm<FormDataLogin>();


    const onSubmit = (data: FormDataLogin) => {
        console.log(data);
    };

    return (
       <div className={`${inter.className} min-h-screen flex flex-col md:flex-row justify-center items-center`}>

            <div className="hidden md:flex w-1/2 h-screen bg-gray-400 items-center justify-center p-6">

                <img
                    // src="/image-login/register.png"
                    alt="image"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center h-auto flex-col">
                <div className="w-[90%]">
                    <h1 className="text-5xl font-bold text-gray-900 mb-7">Ei,Olá !</h1>
                    <p className="text-gray-500 text-[16px] 2xl:text-2xl">Faça suas transações com segurança</p>

                    <form className="mt-8 flex flex-col gap-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col max-w-[800px]">
                            <button
                                type="button"
                                className="relative w-[full] h-[53px] 2xl:h-[73px] border rounded-lg bg-white text-black font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
                            >

                                <img
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                                    src="/icon/icon-google.png"
                                    alt="Google"
                                />

                                <span className="block text-center w-full text-[17px] 2xl:text-[21px]">Login com Google</span>
                            </button>
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("email", { required: "Email é obrigatório" })}
                                type="email"
                                placeholder="Email"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.email && <span className="text-red-500 text-sm mt-1 2xl:text-[17px] transition ease-in duration-300">{errorsRegister.email.message}</span>}
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("password", {
                                    required: "Senha é obrigatória",
                                 
                                })}
                                type="password"
                                placeholder="Senha"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.password && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{errorsRegister.password.message}</span>}
                        </div>
                        <Link href='' className="text-[#090B83]  font-medium text-[17px] 2xl:text-[20px] text-end max-w-[800px]">Esqueceu sua senha?</Link>
                        <button
                            type="submit"
                            className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-90 "
                        >
                            Logar
                        </button>
                        <span className=" text-[17px] 2xl:text-[20px] text-center max-w-[800px] mt-9">Não tem uma conta? <Link className="text-[#090B83]  font-bold" href='/auth/register'>Registrar</Link></span>
                    </form>
                </div>
            </div>


        </div>
    );
}
