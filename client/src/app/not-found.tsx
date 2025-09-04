"use client";
import Link from "next/link";
import Image from "next/image"
import { HiArrowLongLeft } from "react-icons/hi2";
export default function NotFound() {
  return (
    <main className="flex flex-col h-dvh justify-evenly">
  <section className="flex px-9 justify-around items-center">
    <h1 className="font-medium text-5xl max-w-[700px]">Hmm… não conseguimos achar essa página.</h1>

    <div className="flex flex-col gap-2">
      <h2 className="text-[200px] leading-none">404</h2>
      <p className="max-w-[500px] text-base">
         A página que procura não está disponível ou nunca existiu.  
  Verifique o endereço ou volte para a página inicial.
      </p>
      <Link
        href="/"
        className="mt-4 flex items-center gap-2 hover:text-primary max-w-[270px]" 
      >
        <HiArrowLongLeft  size={50}/>
        Voltar para o inicio
      </Link>
    </div> 
  </section>
   <div className="flex items-center justify-between">
     <Image
      width={300}
      height={100}
      alt="plug"
      src="/images/plug.png"
     className="w-40 h-auto" 
      />
     <Image
      width={300}
      height={100}
      alt="plug"
      src="/images/tomada.jpeg"
            className="w-40 h-auto" 
      />
   </div>
</main>
  );
}
