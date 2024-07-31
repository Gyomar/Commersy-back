import {
  IsInt,
  IsDate,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsBoolean,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateQuotationDto {
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

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateQuotationDto extends PartialType(CreateQuotationDto) {}

export class FilterQuotationDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
