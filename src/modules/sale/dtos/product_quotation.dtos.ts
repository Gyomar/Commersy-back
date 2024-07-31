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

export class CreateProductQuotationDto {
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
  readonly quotationRowid: number;

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

export class UpdateProductQuotationDto extends PartialType(
  CreateProductQuotationDto,
) {}

export class FilterProductQuotationDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
