import { IsEnum, IsIn, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: "Book name"
  })
  @IsString()
  bookName: string;

  @ApiProperty({
    description: "Price"
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: "Currency",
    enum: ['CZK', 'EUR']
  })
  // @IsEnum(['CZK', 'EUR']) // retuened error value was incorrect - missing list of possibilities
  @IsIn(['CZK', 'EUR'])
  currency: 'CZK' | 'EUR';

  @ApiProperty({
    description: "Book description"
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Author",
    required: false 
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({
    description: "ISBN",
    required: false
  })
  @IsOptional()
  @IsString()
  isbn?: string;
}