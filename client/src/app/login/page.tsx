"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { FormDataLogin } from "@/types/FormData";
import { Inter } from 'next/font/google';
import Input from "@/components/ui/input";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormDataLogin>();


    const onSubmit = (data: FormDataLogin) => {
        console.log(data);
    };

    return (
        <div className={`${inter.className} min-h-screen flex flex-col md:flex-row justify-center items-center`}>
            <div className="hidden md:flex w-1/2 h-screen items-center justify-center relative ">
                <p className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-lg z-10">
                    logo
                </p>
                <Carousel className="h-screen p-6"
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                    ]}
                >
                    <CarouselContent className="h-screen">
                        <CarouselItem className="h-screen">
                            <img
                                src="/image-login/image-carousel.png"
                                alt="image"
                                className="object-cover w-full h-[95%]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                                src="/image-login/image-carousel.png"
                                alt="image"
                                className="object-cover w-full h-[95%]"
                            />
                        </CarouselItem>
                        <CarouselItem>
                            <img
                                src="/image-login/image-carousel.png"
                                alt="image"
                                className="object-cover w-full h-[95%]"
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>

            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center h-auto flex-col">
                <div className="w-[90%] lg:w-[60%]">
                    <h1 className="2xl:text-5xl font-bold text-3xl mb-7">Ei,Olá !</h1>
                    <p className="text-gray-500 text-[14px] 2xl:text-2xl font-medium">Faça suas transações com segurança</p>

                    <form className="mt-8 flex flex-col  2xl:gap-4  w-full" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col max-w-[900px]">
                            <button
                                type="button"
                                className="relative w-[full] h-[53px] 2xl:h-[73px] border    bg-[var(--bg-google)]text-black font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer  shadow-lg mb-4 max-w-[800px]"
                            >

                                <img
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                                    src="/icon/icon-google.png"
                                    alt="Google"
                                />

                                <span className="block text-center w-full text-[17px] 2xl:text-[20px]">Login com Google</span>
                            </button>
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("email", { required: "Email é obrigatório" })}
                                type="email"
                                placeholder="Email"
                                className="w-full h-[53px] 2xl:h-[73px] px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-var text-[17px] 2xl:text-[21px] bg-[var(--input)] "
                            />
                            <div className="min-h-[20px] 2xl:my-2 mt-1.5">
                                {errors.email && (
                                    <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px] transition ease-in duration-300 ">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col max-w-[800px]">
                            <Input
                                {...register("password", {
                                    required: "Senha é obrigatória",

                                })}
                                type="password"
                                placeholder="Senha"
                                className="w-[full] h-[53px] 2xl:h-[73px]  px-4 border focus:ring-2 focus:ring-blue-500 focus:outline-none bg-[var(--input)] text-[17px] 2xl:text-[21px] "
                            />
                            <div className="min-h-[20px] 2xl:my-2 mt-1.5">
                                {errors.password && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{errors.password.message}</span>}

                            </div>

                        </div>
                        <Link href='' className="text-[var(--txt-green)] mb-4 font-medium text-[17px] 2xl:text-[20px] text-end max-w-[800px]">Esqueceu sua senha?</Link>
                        <button
                            type="submit"
                            className="w-full h-[53px] 2xl:h-[73px] max-w-[800px] px-4 border bg-black focus:outline-none text-white cursor-pointer hover:opacity-90  font-bold  2xl:text-[22px] transition ease-in duration-300"
                        >
                            Logar
                        </button>
                        <span className=" text-[17px] 2xl:text-[20px] text-center max-w-[800px] mt-9 font-medium">Não tem uma conta? <Link className="text-[var(--txt-green)]  font-bold" href='/register'>Registrar</Link></span>
                    </form>
                </div>
            </div>


        </div>
    );
}
