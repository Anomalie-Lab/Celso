"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "@/types/FormData";
import { Inter } from 'next/font/google';
import Input from "@/components/ui/input";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export default function Register() {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: errorsRegister }
    } = useForm<FormDataRegister>();


    const onSubmit = (data: FormDataRegister) => {
        console.log(data);
    };



    const password = watch("password");

    return (
        <div className={`${inter.className} min-h-screen flex flex-col md:flex-row justify-center items-center`}>

            <div className="hidden md:flex w-1/2 h-screen bg-gray-400 items-center justify-center p-6">

                <img
                    // src="/image-login/register.png"
                    alt="image"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center  flex-col ">

                <div className="w-[90%]">
                   
                    <form className="mt-8 flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
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

                                <span className="block text-center w-full text-[17px] 2xl:text-[21px]">Registrar com Google</span>
                            </button>
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("fullName", { required: "nome é obrigatório" })}
                                type="text"
                                placeholder="nome completo"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.fullName && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{errorsRegister.fullName.message}</span>}
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("email", {
                                    required: "email é obrigatório",
                                    
                                })}
                                type="email"
                                placeholder="Email"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.email && <span className="text-red-500 text-sm mt-1 2xl:text-[17px] ">{errorsRegister.email.message}</span>}
                        </div>
                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("telephone", {
                                    required: "telefone é obrigatório",
                                 
                                })}
                                type="text"
                                placeholder="Telefone"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.telephone && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{errorsRegister.telephone.message}</span>}
                        </div>
                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("password", {
                                    required: "Senha é obrigatória",
                                    minLength: { value: 6, message: "Senha mínima 6 caracteres" }
                                })}
                                type="password"
                                placeholder="Senha"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.password && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{errorsRegister.password.message}</span>}
                        </div>
                        <div className="flex flex-col max-w-[800px]">
                            <Input
                               {...register("confirmPassword", {
                                    required: "Confirmação é obrigatória",
                                    validate: value => value === password || "As senhas não coincidem"
                                })}
                                type="password"
                                placeholder="Confirme sua senha"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[#f4f1ff] text-[17px] 2xl:text-[21px]"
                            />
                            {errorsRegister.confirmPassword && <span className="text-red-500 text-sm mt-1 2xl:text-[17px]">{errorsRegister.confirmPassword.message}</span>}
                        </div>
                       
                        <button
                            type="submit"
                            className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-90 "
                        >
                            Registrar
                        </button>
                        <span className=" text-[17px] 2xl:text-[20px] text-center max-w-[800px] ">Já tenho uma conta! <Link className="text-[#090B83]  font-bold" href='/auth/login'>Logar</Link></span>
                    </form>
                </div>
            </div>


        </div>
    );
}
