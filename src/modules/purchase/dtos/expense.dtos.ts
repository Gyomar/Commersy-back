import {
  IsString,
  IsInt,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsDate,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
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

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly coinRowid: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: number;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {}

export class FilterExpenseDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
