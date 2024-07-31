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
  CreateProductSaleDto,
  UpdateProductSaleDto,
  FilterProductSaleDto,
} from '../dtos/product_sale.dtos';
import { ProductSaleService } from '../services/product_sale.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Products Sales')
@Controller('products-sales')
export class ProductSaleController {
  constructor(private productSaleService: ProductSaleService) {}

  @ApiOperation({ summary: 'Total count of products sales' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.productSaleService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of products sales' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProductSaleDto) {
    const user = req.user as PayloadToken;
    return this.productSaleService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One product sale' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.productSaleService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create products sales' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProductSaleDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.productSaleService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update products sales' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProductSaleDto,
  ) {
    const user = req.user as PayloadToken;
    return this.productSaleService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove products sales' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.productSaleService.delete(user.sub, rowid);
  }
}
