import {
  IsInt,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductSaleDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly saleRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productRowid: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly unitPrice: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly totalPrice: number;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateProductSaleDto extends PartialType(CreateProductSaleDto) {}

export class FilterProductSaleDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
