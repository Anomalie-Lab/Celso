import * as yup from "yup";

export const SchemaRegister = yup.object({
  fullName: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  telephone: yup.string().required("Telefone é obrigatório").min(11, "Telefone inválido"),
  password: yup.string().min(8, "Senha deve ter pelo menos 8 caracteres").required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  terms: yup.boolean().oneOf([true], "Você precisa aceitar os termos e condições").required("Você precisa aceitar os termos e condições"),
});

export const SchemaLogin = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});
