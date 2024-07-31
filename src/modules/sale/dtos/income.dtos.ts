import {
  IsString,
  IsInt,
  IsDate,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
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

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  readonly paidReference: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly paymentMethodRowid: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly coinRowid: number;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {}

export class FilterIncomeDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
