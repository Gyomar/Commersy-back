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
  CreateProductQuotationDto,
  UpdateProductQuotationDto,
  FilterProductQuotationDto,
} from '../dtos/product_quotation.dtos';
import { ProductQuotationService } from '../services/product_quotation.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Products Quotations')
@Controller('products-quotations')
export class ProductQuotationController {
  constructor(private productQuotationService: ProductQuotationService) {}

  @ApiOperation({ summary: 'Total count of products quotations' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.productQuotationService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of products quotations' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProductQuotationDto) {
    const user = req.user as PayloadToken;
    return this.productQuotationService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One product quotation' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.productQuotationService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create products quotations' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProductQuotationDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.productQuotationService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update products quotations' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProductQuotationDto,
  ) {
    const user = req.user as PayloadToken;
    return this.productQuotationService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove products quotations' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.productQuotationService.delete(user.sub, rowid);
  }
}
