import PageLayout from "../../components/support/pageLayout";

export default function PolicySupport() {
  return (
    <PageLayout title="Política de Privacidade">
      <div className="prose prose-lg max-w-none max-h-[600px] overflow-y-auto">
        <div className="space-y-8 text-justify   md:max-w-4/5">
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              1. Informações que Coletamos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Coletamos informações que você nos fornece diretamente, como quando cria uma conta, 
                faz uma compra ou entra em contato conosco. Essas informações podem incluir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nome, endereço de email e informações de contato</li>
                <li>Endereço de entrega e informações de pagamento</li>
                <li>Histórico de compras e preferências</li>
                <li>Comunicações que você mantém conosco</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              2. Como Usamos suas Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos suas informações para fornecer, manter e melhorar nossos serviços:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Processar e gerenciar suas compras</li>
                <li>Enviar confirmações e atualizações sobre pedidos</li>
                <li>Fornecer suporte ao cliente</li>
                <li>Personalizar sua experiência de compra</li>
                <li>Enviar ofertas e promoções (com seu consentimento)</li>
                <li>Melhorar nossos produtos e serviços</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              3. Compartilhamento de Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                exceto nas seguintes situações:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Com prestadores de serviços que nos ajudam a operar nosso negócio</li>
                <li>Para cumprir obrigações legais ou proteger nossos direitos</li>
                <li>Com seu consentimento explícito</li>
                <li>Em caso de fusão ou aquisição da empresa</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              4. Segurança das Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Implementamos medidas de segurança técnicas e organizacionais para proteger 
                suas informações pessoais contra acesso não autorizado, alteração, divulgação 
                ou destruição.
              </p>
              <p>
                Utilizamos criptografia SSL para proteger dados transmitidos online e 
                armazenamos informações em servidores seguros com acesso restrito.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              5. Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Você tem os seguintes direitos relacionados às suas informações pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar e revisar suas informações pessoais</li>
                <li>Corrigir informações imprecisas ou incompletas</li>
                <li>Solicitar a exclusão de suas informações</li>
                <li>Retirar consentimento para processamento</li>
                <li>Portabilidade de dados</li>
              </ul>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              6. Cookies e Tecnologias Similares
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                em nosso site. Essas tecnologias nos ajudam a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Lembrar suas preferências e configurações</li>
                <li>Analisar o uso do site e melhorar nossos serviços</li>
                <li>Personalizar conteúdo e anúncios</li>
                <li>Fornecer funcionalidades de segurança</li>
              </ul>
              <p>
                Você pode controlar o uso de cookies através das configurações do seu navegador.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              7. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar esta Política de Privacidade periodicamente. 
                Notificaremos você sobre mudanças significativas através de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Email para o endereço registrado em sua conta</li>
                <li>Aviso em nosso site</li>
                <li>Outros meios apropriados</li>
              </ul>
              <p>
                Recomendamos que você revise esta política regularmente para se manter 
                informado sobre como protegemos suas informações.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-md font-bold text-gray-900 mb-4">
              8. Contato
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade ou sobre 
                como tratamos suas informações pessoais, entre em contato conosco:
              </p>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacidade@gmail.com.br</p>
                  <p><strong>Telefone:</strong> (18) 3221-2232</p>
                </div>
              </div>
            </div>
          </section>
          <div className="border-t border-gray-200 pt-8 mt-12">
            <p className="text-sm text-gray-500 text-center">
              <strong>Última atualização:</strong> 15 de Janeiro de 2024
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
