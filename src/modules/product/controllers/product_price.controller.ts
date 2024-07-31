import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import {
  CreateProductPriceDto,
  UpdateProductPriceDto,
  FilterProductPriceDto,
} from '../dtos/product_price.dtos';
import { ProductPriceService } from '../services/product_price.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Products Prices')
@Controller('products-prices')
export class ProductPriceController {
  constructor(private productPriceService: ProductPriceService) {}

  @ApiOperation({ summary: 'Total count of products prices' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.productPriceService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of products prices' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProductPriceDto) {
    const user = req.user as PayloadToken;
    return this.productPriceService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One product price' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.productPriceService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create products prices' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProductPriceDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.productPriceService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update products prices' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProductPriceDto,
  ) {
    const user = req.user as PayloadToken;
    return this.productPriceService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove products prices' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.productPriceService.delete(user.sub, rowid);
  }
}
