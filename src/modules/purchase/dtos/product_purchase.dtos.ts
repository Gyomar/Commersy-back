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

export class CreateProductPurchaseDto {
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
  readonly purchaseRowid: number;

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
  readonly unitCost: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly totalCost: number;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateProductPurchaseDto extends PartialType(
  CreateProductPurchaseDto,
) {}

export class FilterProductPurchaseDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
