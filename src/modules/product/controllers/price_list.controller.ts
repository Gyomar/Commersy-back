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
  CreatePriceListDto,
  UpdatePriceListDto,
  FilterPriceListDto,
} from '../dtos/price_list.dtos';
import { PriceListService } from '../services/price_list.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Prices Lists')
@Controller('prices-lists')
export class PriceListController {
  constructor(private priceListService: PriceListService) {}

  @ApiOperation({ summary: 'Total count of prices lists' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.priceListService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of prices lists' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterPriceListDto) {
    const user = req.user as PayloadToken;
    return this.priceListService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One price list' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.priceListService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create prices lists' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreatePriceListDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.priceListService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update prices lists' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdatePriceListDto,
  ) {
    const user = req.user as PayloadToken;
    return this.priceListService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove prices lists' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.priceListService.delete(user.sub, rowid);
  }
}
