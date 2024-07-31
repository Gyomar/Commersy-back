import {
  IsString,
  IsInt,
  IsUUID,
  IsNotEmpty,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsPositive,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateZoneDto {
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

  @IsDate()
  @IsOptional()
  @ApiProperty()
  readonly updateAt: Date;

  @IsBoolean()
  readonly isNew: boolean;
}

export class UpdateZoneDto extends PartialType(CreateZoneDto) {}

export class FilterZoneDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
