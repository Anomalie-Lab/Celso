import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class RegisterDto {
  @IsString()
  @ApiProperty({ description: "Nome Completo", example: "John Doe" })
  fullname: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Nome de usuário", example: "johndoe123" })
  username?: string;

  @IsEmail()
  @ApiProperty({ description: "Email de Contato", example: "john.doe@email.com" })
  email: string;

  @IsString()
  @ApiProperty({ description: "Senha do Contato", example: "Senha123@" })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "Telefone de Contato", example: "(11) 99999-9999" })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "CPF/CNPJ", example: "99.999.999/9999-99" })
  document?: string;
}

export class LoginDto {
  @IsString()
  @ApiProperty({ description: "email", example: "john.doe@email.com" })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: "password", example: "Senha123@" })
  password: string;
}

export class ForgotPasswordUserDto {
  @IsEmail()
  @ApiProperty({ description: "email", example: "johndoe@gmail.com" })
  email: string;
}

export class ResetPasswordUserDto {
  @IsString()
  @ApiProperty({ description: "token", example: "token JWT" })
  token: string;

  @IsEmail()
  @ApiProperty({ description: "email", example: "johndoe@gmail.com" })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ description: "password", example: "@12345679Aa" })
  password: string;
}
