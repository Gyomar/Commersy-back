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
  CreateProductPurchaseDto,
  UpdateProductPurchaseDto,
  FilterProductPurchaseDto,
} from '../dtos/product_purchase.dtos';
import { ProductPurchaseService } from '../services/product_purchase.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Products Purchases')
@Controller('products-purchases')
export class ProductPurchaseController {
  constructor(private productPurchaseService: ProductPurchaseService) {}

  @ApiOperation({ summary: 'Total count of products purchases' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.productPurchaseService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of products purchases' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProductPurchaseDto) {
    const user = req.user as PayloadToken;
    return this.productPurchaseService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One product purchase' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.productPurchaseService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create products purchases' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProductPurchaseDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.productPurchaseService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update products purchases' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProductPurchaseDto,
  ) {
    const user = req.user as PayloadToken;
    return this.productPurchaseService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove products purchases' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.productPurchaseService.delete(user.sub, rowid);
  }
}
