export const useToast = () => {
  const toast = (options: {
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
  }) => {
    // Implementação simples com alert para evitar dependências
    const message = `${options.title || (options.variant === "destructive" ? "Erro" : "Sucesso")}${options.description ? `: ${options.description}` : ""}`;
    
    if (options.variant === "destructive") {
      console.error(message);
    } else {
      console.log(message);
    }
    
    // Em produção, você pode implementar um sistema de toast mais robusto
    alert(message);
  };

  return { toast };
};
