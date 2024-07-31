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
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
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
  @ApiProperty()
  readonly typeDocRowid: number;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  @ApiProperty()
  readonly doc: string;

  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(120)
  @ApiProperty()
  readonly address: string;

  @IsPhoneNumber()
  @ApiProperty()
  readonly phone: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsInt()
  @ApiProperty()
  readonly zoneRowid: string;

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

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomerDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
