import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class ProductDTO {
  @IsString()
  @Length(1, 150)
  name: string;

  @IsString()
  @Length(1, 200)
  description: string;

  @IsNumber()
  @Min(0.01)
  @Max(10000)
  price: number;

  @IsString()
  categoryId: string;
}
