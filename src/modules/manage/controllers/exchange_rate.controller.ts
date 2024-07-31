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
  CreateExchangeRateDto,
  UpdateExchangeRateDto,
  FilterExchangeRateDto,
} from '../dtos/exchange_rate.dtos';
import { ExchangeRateService } from '../services/exchange_rate.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Exchange Rates')
@Controller('exchange-rates')
export class ExchangeRateController {
  constructor(private exchangeRateService: ExchangeRateService) {}

  @ApiOperation({ summary: 'Total count of exchange rates' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.exchangeRateService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of exchange rates' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterExchangeRateDto) {
    const user = req.user as PayloadToken;
    return this.exchangeRateService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One exchange rate' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.exchangeRateService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create exchange rates' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateExchangeRateDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.exchangeRateService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update exchange rates' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateExchangeRateDto,
  ) {
    const user = req.user as PayloadToken;
    return this.exchangeRateService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove exchange rates' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.exchangeRateService.delete(user.sub, rowid);
  }
}
