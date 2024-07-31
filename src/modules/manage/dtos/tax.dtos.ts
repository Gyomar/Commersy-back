import {
  IsString,
  IsInt,
  IsUUID,
  IsBoolean,
  IsNotEmpty,
  Min,
  MaxLength,
  MinLength,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTaxDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  readonly name: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly state: boolean;

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateTaxDto extends PartialType(CreateTaxDto) {}

export class FilterTaxDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
