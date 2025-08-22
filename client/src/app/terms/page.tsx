export default function Terms() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Termos de Uso</h1>
        <p className="text-gray-600 mb-4">
          <strong>Última atualização:</strong> 21/08/2025
        </p>
        <p className="mb-6">Ao acessar e utilizar o site [Nome da Loja], você concorda com os seguintes termos. Caso não concorde, não utilize a plataforma.</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Uso do Site</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>O site é destinado exclusivamente para compras de produtos da [Nome da Loja].</li>
            <li>É proibido usar o site para atividades ilegais, fraudulentas ou que violem a legislação vigente.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. Cadastro do Usuário</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Para realizar compras, pode ser necessário criar uma conta.</li>
            <li>As informações fornecidas devem ser verdadeiras, completas e atualizadas.</li>
            <li>Você é responsável por manter a confidencialidade do login e senha.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Propriedade Intelectual</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Todo o conteúdo do site (textos, imagens, códigos, logotipos) pertence à [Nome da Loja].</li>
            <li>É proibida reprodução, distribuição ou uso sem autorização prévia.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Permissões Concedidas</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Uso de dados pessoais para gerenciamento da conta, envio de e-mails, notificações e melhorias do site.</li>
            <li>Uso de cookies para personalizar a experiência de compra.</li>
            <li>Recebimento de comunicações promocionais, com opção de descadastro a qualquer momento.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Responsabilidade</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Não nos responsabilizamos por prejuízos decorrentes de mau uso da plataforma ou de terceiros.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Alterações dos Termos</h2>
          <p className="text-gray-700">Estes Termos podem ser atualizados a qualquer momento. O uso contínuo do site após alterações significa aceitação dos novos termos.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Contato</h2>
          <p className="text-gray-700">
            Dúvidas ou solicitações podem ser enviadas para:{" "}
            <a href="#" className="text-[var(--txt-terciary)] hover:underline">
              @gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
