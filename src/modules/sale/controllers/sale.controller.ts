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

import { CreateSaleDto, UpdateSaleDto, FilterSaleDto } from '../dtos/sale.dtos';
import { SaleService } from '../services/sale.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Sales')
@Controller('sales')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @ApiOperation({ summary: 'Total count of sales' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.saleService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of sales' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterSaleDto) {
    const user = req.user as PayloadToken;
    return this.saleService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One sale' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.saleService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create sales' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateSaleDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.saleService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update sales' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateSaleDto,
  ) {
    const user = req.user as PayloadToken;
    return this.saleService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove sales' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.saleService.delete(user.sub, rowid);
  }
}
