import {
  IsInt,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateExchangeRateDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly rate: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly fromCoin: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly toCoin: number;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateExchangeRateDto extends PartialType(CreateExchangeRateDto) {}

export class FilterExchangeRateDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
