import {
  IsString,
  IsInt,
  IsUUID,
  IsBoolean,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePriceListDto {
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

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly coinRowid: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly type: number;

  @IsPositive()
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

export class UpdatePriceListDto extends PartialType(CreatePriceListDto) {}

export class FilterPriceListDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
