"use client";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { ContactFormData, SchemaContact } from "@/entities/schemas";
import { yupResolver } from "@hookform/resolvers/yup";


export default function ContactUs() {
  const { register, handleSubmit, formState } = useForm<ContactFormData>({ resolver: yupResolver(SchemaContact) });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };
  return (
    <main className="grid grid-cols-2 h-[800px] bg-black">
      <section className=" w-1/2 items-center justify-center lg:pl-6 bg-red-500 ">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-gray-900 
        mb-4">Fale Conosco</h1>
      </div>

        <div className="max-w-[400px]">
          <h2 className="font-bold">• E-mail</h2>
          <p className="font-light">
            Você também pode tirar todas suas dúvidas pelo e-mail <strong>sac@gmail.com.br</strong>
          </p>
          <p className="font-light">De segunda à sexta-feira, das 9 às 18 horas.</p>
        </div>

        <div className="max-w-[400px]">
          <h2 className=" font-bold">• Formulário</h2>
          <p className="font-light">Se preferir preencha com seus dados para que possamos responder.</p>
        </div>


        <div className="max-w-[400px]">
          <h2 className=" font-bold">• Informações:</h2>
          <p className="font-light">Atendimento de segunda a sexta das 9:00 as 18:00</p>
        </div>

        <div className="max-w-[400px]">
          <h2 className=" font-bold">• Medicine </h2>
          <p className="font-light">new York, Estados Unidos - NY | CEP: 000-001</p>
        </div>

        <div className="max-w-[400px]">
          <p className="font-bold">TEDIO DOS SANTOS OLIVEIRA CNPJ: 00.000.000/0001-11 </p>
        </div>
        <p>© Copyright 2025 - Todos os Direitos Reservados !</p>
      </section>

      <section className=" w-[100%] lg:w-1/2 flex flex-col items-center justify-center lg:pl-16 mt-9">
        <h3 className="font-medium text-[#555555] text-[18px] text-start  w-full">Enviar uma mensagem</h3>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4  w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <p className="text-[13px] text-[#555555] ">Nome completo:</p>
            <InputAuthUi {...register("name")} name="name" type="text" error={formState.errors.name?.message} className="border  w-full max-w-[530px] pl-3" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <p className="text-[13px] text-[#555555] ">endereço de email:</p>
            <InputAuthUi {...register("email")} name="email" type="email" error={formState.errors.email?.message} className="border  w-full not-visited:pl-3 max-w-[530px]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <p className="text-[13px] text-[#555555] ">telefone</p>
            <InputAuthUi {...register("phone")} name="phone" error={formState.errors.phone?.message} type="text" maxLength={11} className="border  w-full   pl-3 max-w-[530px]" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
            <p className="text-[13px] text-[#555555] ">Mensagem</p>
            <textarea {...register("txt_message")} placeholder="Mensagem" className="border p-2 rounded h-32 max-w-[530px] w-full resize-none" />
          </motion.div>
          {formState.errors.txt_message?.message && <span className="text-[var(--destructive)] text-sm mt-1 2xl:text-[17px]">{formState.errors.txt_message.message}</span>}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex mt-4 max-w-[530px] w-full">
            <button className="bg-[var(--background-terciary)] px-3 py-1.5 text-white cursor-pointer hover:opacity-85">Entrar em contato</button>
          </motion.div>
        </form>
      </section>
    </main>
  );
}
