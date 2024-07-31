import {
  IsInt,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductPriceDto {
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
  readonly productRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly priceListRowid: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: number;
}

export class UpdateProductPriceDto extends PartialType(CreateProductPriceDto) {}

export class FilterProductPriceDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
