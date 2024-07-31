import {
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsPositive,
  Min,
  IsInt,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly userRowid: number;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly expirationAt: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  readonly updateAt: Date;
}

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}

export class FilterSubscriptionDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
