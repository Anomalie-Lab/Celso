export default function Conditions() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Condições</h1>
        <p className="text-gray-600 mb-4">
          <strong>Última atualização:</strong> 21/08/2025
        </p>
        <p className="mb-6">Ao criar uma conta no [Nome da Loja], você concorda com as seguintes condições:</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Cadastro e Responsabilidade</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Você garante que as informações fornecidas (nome, e-mail, telefone, senha) são verdadeiras, completas e atualizadas.</li>
            <li>É responsável por manter a confidencialidade de sua senha e dados de acesso.</li>
            <li>A conta deve ser usada apenas para fins legítimos, relacionados à compra de materiais médicos.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Uso da Conta e Produtos</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>A conta será utilizada apenas para compras de produtos disponíveis no site.</li>
            <li>É proibido utilizar a conta para atividades ilegais, venda de produtos para terceiros não autorizados ou uso indevido de materiais médicos.</li>
            <li>Alguns produtos podem ter restrições legais ou regulamentares, sendo responsabilidade do comprador cumprir as normas vigentes.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Proteção de Dados</h2>
          <p className="text-gray-700">
            Seus dados serão tratados de acordo com a <strong>LGPD (Lei nº 13.709/2018)</strong>. Informações pessoais poderão ser usadas para processar pedidos, envio de notificações sobre pedidos e promoções, e melhorar a experiência no site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">4. Aceite dos Termos</h2>
          <p className="text-gray-700">Ao criar uma conta, você declara estar de acordo com estas Condições de Cadastro. O não cumprimento destes termos pode resultar em suspensão ou exclusão da conta sem aviso prévio.</p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2">5. Contato</h2>
          <p className="text-gray-700">
            Em caso de dúvidas sobre seu cadastro ou produtos, entre em contato:{" "}
            <a href="mailto:seuemail@dominio.com" className="text-[var(--txt-terciary)] hover:underline">
              @gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
