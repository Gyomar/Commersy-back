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
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/product.dtos';
import { ProductService } from '../services/product.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Total count of products' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.productService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of products' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProductDto) {
    const user = req.user as PayloadToken;
    return this.productService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One product' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.productService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create products' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProductDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.productService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update products' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProductDto,
  ) {
    const user = req.user as PayloadToken;
    return this.productService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove products' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.productService.delete(user.sub, rowid);
  }
}
