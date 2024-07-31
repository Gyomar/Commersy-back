import {
  IsString,
  IsInt,
  IsUUID,
  IsBoolean,
  IsNotEmpty,
  Min,
  IsOptional,
  IsPositive,
  IsDate,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
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

  @IsString()
  @MaxLength(30)
  @IsOptional()
  @ApiProperty()
  readonly description: string;

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

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategoryDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
