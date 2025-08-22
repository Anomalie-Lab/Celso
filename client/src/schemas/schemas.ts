import * as yup from "yup";

export interface FormDataRegister {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
  terms: boolean;
}

export const SchemaRegister = yup.object({
  fullname: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório").min(11, "Telefone inválido"),
  password: yup.string().min(8, "Senha deve ter pelo menos 8 caracteres").required("Senha é obrigatória"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
  terms: yup.boolean().oneOf([true], "Você precisa aceitar os termos e condições").required("Você precisa aceitar os termos e condições"),
});

export interface FormDataLogin {
  email: string;
  password: string;
}
export const SchemaLogin = yup.object({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  txt_message: string;
}
export const SchemaContact = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório").min(11, "Telefone inválido"),
  txt_message: yup.string().required("Mensagem é obrigatória"),
});
