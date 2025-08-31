import * as yup from "yup";

export type FormDataRegister = yup.InferType<typeof SchemaRegister>;
export const SchemaRegister = yup.object({
  fullname: yup.string().required("required"),
  email: yup.string().email("Email inválido").required("required"),
  phone: yup.string().required("required").min(11, "Telefone inválido"),
  password: yup.string().min(8, "Senha deve ter pelo menos 8 caracteres").required("required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("required"),
  terms: yup.boolean().oneOf([true], "Você precisa aceitar os termos e condições").required("required"),
});

export type FormDataLogin = yup.InferType<typeof SchemaLogin>;
export const SchemaLogin = yup.object({
  email: yup.string().email("Email inválido").required("required"),
  password: yup.string().required("required"),
});

export type FormDataContact = yup.InferType<typeof SchemaContact>;
export const SchemaContact = yup.object({
  name: yup.string().required("required"),
  email: yup.string().email("Email inválido").required("required"),
  phone: yup.string().required("required").min(11, "Telefone inválido"),
  txt_message: yup.string().required("required"),
});

export type FormDataForgotPassword = yup.InferType<typeof SchemaForgotPassword>;
export const SchemaForgotPassword = yup.object({
  email: yup.string().email("Email inválido").required("required"),
});

export type FormDataEditAccount = yup.InferType<typeof SchemaEditAccount>;
export const SchemaEditAccount = yup.object({
  fullname: yup
    .string()
    .required("required")
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras e espaços"),

  username: yup
    .string()
    .required("required")
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .max(30, "Username deve ter no máximo 30 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/, "Username deve conter apenas letras, números e underscore")
    .lowercase(),

  email: yup.string().required("required").email("Email inválido").max(100, "Email deve ter no máximo 100 caracteres").lowercase(),

  phone: yup
    .string()
    .required("required")
    .matches(/^(\+55\s?)?(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/, "Telefone deve estar no formato: (11) 99999-9999 ou 11999999999")
    .transform((value) => {
      if (!value) return undefined;
      const numbers = value.replace(/\D/g, "");
      if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      }
      if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
      }
      return value;
    }),

  birthdate: yup
    .string()
    .required("required")
    .test("valid-date", "Data de nascimento inválida", (value) => {
      if (!value) return true;
      const date = new Date(value);
      const today = new Date();
      const minDate = new Date("1900-01-01");

      return date >= minDate && date <= today;
    })
    .test("age-limit", "Você deve ter pelo menos 18 anos", (value) => {
      if (!value) return true;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
});

export type FormDataAddress = yup.InferType<typeof SchemaAddress>;
export const SchemaAddress = yup.object({
  street: yup.string().required("required").min(3, "Rua deve ter pelo menos 3 caracteres").max(100, "Rua deve ter no máximo 100 caracteres"),

  number: yup.string().required("required").max(10, "Número deve ter no máximo 10 caracteres"),

  complement: yup.string().optional().nullable().max(50, "Complemento deve ter no máximo 50 caracteres"),

  neighborhood: yup.string().required("required").min(3, "Bairro deve ter pelo menos 3 caracteres").max(50, "Bairro deve ter no máximo 50 caracteres"),

  city: yup.string().required("required").min(2, "Cidade deve ter pelo menos 2 caracteres").max(50, "Cidade deve ter no máximo 50 caracteres"),

  state: yup.string().required("required").length(2, "Estado deve ter exatamente 2 caracteres").uppercase(),

  zip_code: yup
    .string()
    .required("required")
    .matches(/^\d{5}-?\d{3}$/, "CEP deve estar no formato: 12345-678")
    .transform((value) => {
      if (!value) return undefined;
      const numbers = value.replace(/\D/g, "");
      if (numbers.length === 8) {
        return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
      }
      return value;
    }),

  primary: yup.boolean().optional().nullable().default(false),
});
