import {ApiProperty} from '@nestjs/swagger';

export class UserResponseSwagger {
  @ApiProperty({example: 123, description: 'Unique user ID.'})
  id: number;

  @ApiProperty({example: '1234567890abcdef', description: 'Google authentication ID, if linked.', nullable: true})
  google_id?: string;

  @ApiProperty({example: 'Lucas Almeida', description: 'Full name of the user.'})
  fullname: string;

  @ApiProperty({example: 'lucas.almeida99', description: 'Username of the user.'})
  username: string;

  @ApiProperty({example: 'lucas.almeida@example.com', description: "User's email address."})
  email: string;

  @ApiProperty({example: '+55 11 98765-4321', description: "User's phone number.", nullable: true})
  phone?: string;

  @ApiProperty({example: 'https://randomuser.me/api/portraits/men/10.jpg', description: "User's avatar URL."})
  avatar: string;

  @ApiProperty({example: '1995-08-25', description: "User's birthdate.", nullable: true})
  birthdate?: string;

  @ApiProperty({example: 2, description: 'User role ID (e.g., 1 = Admin, 2 = User, 3 = Moderator).'})
  role_id: number;

  @ApiProperty({example: '12345678900', description: "User's national ID.", nullable: true})
  document?: string;

  @ApiProperty({example: true, description: 'Indicates whether two-factor authentication (2FA) is enabled.'})
  enable_2fa: boolean;

  @ApiProperty({example: '2025-01-15T10:15:30.123Z', description: 'Timestamp of user creation.'})
  created_at: string;

  @ApiProperty({example: '2025-02-20T18:45:10.567Z', description: 'Timestamp of last update.'})
  updated_at: string;
}

export class AddressResponseSwagger {
  @ApiProperty({example: 123, description: 'Unique address ID.'})
  id: number;

  @ApiProperty({example: '1234567890abcdef', description: 'User ID.'})
  user_id: number;
}
