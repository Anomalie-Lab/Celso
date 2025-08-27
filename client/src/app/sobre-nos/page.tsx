"use client"
import PageLayout from '@/components/support/pageLayout';

export default function AboutUs() {
  return (
    <PageLayout title="Sobre Nós">
      <div className="bg-white py-2 mb-6">
        <div className="flex flex-col gap-6">
          <div>
            <div className="space-y-4 text-gray-700 text-justify px-1">
              <p>
                A <strong>Hospitalar Distribuidora</strong> nasceu com uma missão clara: democratizar o acesso 
                a equipamentos hospitalares de alta qualidade, oferecendo uma experiência 
                de compra segura e conveniente para profissionais da saúde.
              </p>
              <p>
                Fundada por especialistas da área médica, nossa empresa 
                combina conhecimento técnico com inovação tecnológica para oferecer 
                o melhor aos nossos clientes.
              </p>
              <p>
                Ao longo dos anos, expandimos nosso catálogo para incluir uma ampla 
                variedade de equipamentos, desde autoclaves até macas hospitalares, 
                sempre mantendo nosso compromisso com a qualidade e segurança.
              </p>
            </div>
          </div>
          <div className="p-8 relative top-12 flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-primary mb-4">5+</div>
            <div className="text-xl font-semibold text-gray-900 mb-2">Anos de Experiência</div>
            <div className="text-gray-600">Servindo nossos clientes com excelência</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
