import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber, IsBoolean } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The full name of the user.", example: "John Doe" })
  fullname?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The username of the user.", example: "johndoe123" })
  username?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The email of the user", example: "johndoe@gmail.com" })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The phone of the user.", example: "(11) 99999-9999" })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The document of the user.", example: "000.000.000-00" })
  document?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The avatar of the user ", example: "https://example.com/image.png" })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The password of the user.", example: "123456" })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The birthdate of the user.", example: "1990-01-01" })
  birthdate?: string;
}

export class CreateUpdateAddressDto {
  @IsBoolean()
  @ApiProperty({ description: "Whether the address is primary.", example: true })
  primary: boolean;

  @IsString()
  @ApiProperty({ description: "The street of the address.", example: "123 Main St" })
  street: string;

  @IsString()
  @ApiProperty({ description: "The number of the address.", example: "123" })
  number: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "The complement of the address.", example: "Apt 1" })
  complement?: string;

  @IsString()
  @ApiProperty({ description: "The neighborhood of the address.", example: "Downtown" })
  neighborhood: string;

  @IsString()
  @ApiProperty({ description: "The city of the address.", example: "New York" })
  city: string;

  @IsString()
  @ApiProperty({ description: "The state of the address.", example: "NY" })
  state: string;

  @IsString()
  @ApiProperty({ description: "The zip code of the address.", example: "10001" })
  zip_code: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "The phone of the address.", example: "(11) 99999-9999" })
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: "The country of the address.", example: "Brazil" })
  country?: string;
}