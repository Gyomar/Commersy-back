import {
  IsInt,
  IsDate,
  IsNotEmpty,
  IsBoolean,
  Min,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSaleDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly priceListRowid: number;

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

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}

export class FilterSaleDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
