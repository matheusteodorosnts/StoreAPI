import { IsString, Length } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @Length(1, 50)
  name: string;
}
