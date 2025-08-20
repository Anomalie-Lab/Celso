"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataRegister } from "@/types/FormData";

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormDataRegister>();
    const onSubmit = (data: FormDataRegister) => {
        console.log(data);
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex flex-col md:flex-row justify-center items-center">
            {/* Esquerda: Formulário */}
            <div className="w-full md:w-1/2 flex justify-center items-center h-auto">
                <div className="w-full max-w-lg p-8 flex flex-col  bg-white rounded-lg shadow-lg ">
                    <h1 className="text-3xl font-bold text-gray-900">Crie sua conta</h1>
                    <p className="mt-2 text-gray-600">
                        Já tem uma conta?{" "}
                        <Link href="/auth/login" className="text-blue-600 font-medium hover:underline">
                            Entrar
                        </Link>
                    </p>

                    <form className="mt-8 flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col">
                            <input
                                {...register("fullName", { required: "Nome completo é obrigatório" })}
                                type="text"
                                placeholder="Nome completo"
                                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input
                                {...register("email", { required: "Email é obrigatório" })}
                                type="email"
                                placeholder="Email"
                                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input
                                {...register("telephone", { required: "Telefone é obrigatório" })}
                                type="text"
                                placeholder="Telefone"
                                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.telephone && <span className="text-red-500 text-sm mt-1">{errors.telephone.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input
                                {...register("password", {
                                    required: "Senha é obrigatória",
                                    minLength: { value: 6, message: "Senha mínima 6 caracteres" }
                                })}
                                type="password"
                                placeholder="Senha"
                                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <input
                                {...register("confirmPassword", {
                                    required: "Confirmação é obrigatória",
                                    validate: value => value === password || "As senhas não coincidem"
                                })}
                                type="password"
                                placeholder="Confirme sua senha"
                                className="w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.confirmPassword && <span className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</span>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Criar conta
                        </button>
                    </form>

                </div>
            </div>

            {/* Direita: Imagem */}
            <div className="hidden md:flex w-1/2 h-screen bg-gray-100 items-center justify-center">
            img
                {/* <img
                    src={''}
                    alt="image"
                    className="object-cover w-full h-full"
                /> */}
            </div>
        </div>
    );
}
