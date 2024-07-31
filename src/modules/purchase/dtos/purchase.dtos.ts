import {
  IsInt,
  IsBoolean,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePurchaseDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly providerRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly coinRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly paymentConditionRowid: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly paidup: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}

export class FilterPurchaseDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
