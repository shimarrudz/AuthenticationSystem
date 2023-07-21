import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    example: 'vic.shima@gmail.com',
    description: 'E-mail adress that will be validated for login',
    type: 'string',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: 'Password@1234',
    description: 'Password that will be validated for login',
    type: 'string',
    required: true,
  })
  password: string;
}
