"use client";
import { InputAuthUi } from "@/components/ui/inputs/input.auth";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FormDataContact, SchemaContact } from "@/entities/schemas";
import { yupResolver } from "@hookform/resolvers/yup";


export default function ContactUs() {
  const { register, handleSubmit, formState } = useForm<FormDataContact>({ resolver: yupResolver(SchemaContact) });

  const onSubmit = (data: FormDataContact) => {
    console.log(data);
  };
  return (
     <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen ">
      {/* Seção Fale Conosco */}
      <section className="w-full flex flex-col justify-start lg:justify-center lg:pl-12 p-6 lg:p-0 bg-primary text-white gap-6">
        <h1 className="text-3xl font-bold mb-6 mt-40 lg:mt-0">Fale Conosco</h1>

        <div className="space-y-4 ">
          <div>
            <h2 className="font-bold">• E-mail</h2>
            <p className="font-light">
              Você também pode tirar todas suas dúvidas pelo e-mail{" "}
              <strong>sac@gmail.com.br</strong>
            </p>
            <p className="font-light">De segunda à sexta-feira, das 9 às 18 horas.</p>
          </div>

          <div>
            <h2 className="font-bold">• Formulário</h2>
            <p className="font-light">
              Se preferir, preencha com seus dados para que possamos responder.
            </p>
          </div>

          <div>
            <h2 className="font-bold">• Informações:</h2>
            <p className="font-light">Atendimento de segunda a sexta das 9:00 às 18:00</p>
          </div>

          <div>
            <h2 className="font-bold">• Medicine</h2>
            <p className="font-light">New York, Estados Unidos - NY | CEP: 000-001</p>
          </div>

          <div>
            <p className="font-bold">
              TEDIO DOS SANTOS OLIVEIRA - CNPJ: 00.000.000/0001-11
            </p>
          </div>

          <p className="text-sm mt-4">© Copyright 2025 - Todos os Direitos Reservados!</p>
        </div>
      </section>

      {/* Seção Formulário */}
    <section className="w-full flex flex-col items-center justify-start lg:justify-center lg:pl-16 p-6">
        <h3 className="font-medium text-[#555555] text-lg w-full text-center mt-40">
          Enviar uma mensagem
        </h3>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-4 w-full max-w-[530px] gap-4"
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
      
            <InputAuthUi 
            placeholder="Nome"
            {...register("name")} name="name" type="text" error={formState.errors.name?.message}  />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        
            <InputAuthUi 
             placeholder="Email"
            {...register("email")} name="email" type="email" error={formState.errors.email?.message}  />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
        
            <InputAuthUi
             placeholder="Telefone"
            {...register("phone")} name="phone" error={formState.errors.phone?.message} type="text" maxLength={11}  />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }}>
       
            <textarea {...register("txt_message")} placeholder="Mensagem" className="border border-gray-200  p-2  rounded-sm h-32 w-full resize-none outline-none" />
            {formState.errors.txt_message?.message && (
              <span className="text-red-500 text-sm 2xl:text-base mt-1">{formState.errors.txt_message.message}</span>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="flex mt-4 w-full">
            <button className="bg-primary rounded-sm px-3 py-2 text-white hover:opacity-85 cursor-pointer w-full ">
              Entrar em contato
            </button>
          </motion.div>
        </form>
      </section>
    </main>
  );
}
