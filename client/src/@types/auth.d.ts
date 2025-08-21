declare namespace Auth {
  interface FormDataRegister {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    telephone: string;
    terms: boolean;
  }

  interface FormDataLogin {
    email: string;
    password: string;
  }
}
