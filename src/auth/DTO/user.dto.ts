import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

enum Roles {
  'Member',
  'Employee',
  'Manager',
}

export class UserDTO {
  @IsString()
  @Length(1, 150)
  name: string;

  @IsString()
  @IsEmail()
  @Length(9, 150)
  email: string;

  @IsString()
  @Length(8, 150)
  password: string;

  @IsString()
  @Length(6, 8)
  @IsEnum(Roles)
  Role: string;
}
