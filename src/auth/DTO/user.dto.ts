import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

enum Roles {
  Member = 'Member',
  Employee = 'Employee',
  Manager = 'Manager',
}

export class UserDTO {
  @IsString()
  @Length(1, 150)
  name: string;

  @IsEmail()
  @Length(9, 150)
  email: string;

  @IsString()
  @Length(8, 150)
  password: string;

  @IsEnum(Roles)
  role: Roles;
}
