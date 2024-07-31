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

import { CreateCoinDto, UpdateCoinDto, FilterCoinDto } from '../dtos/coin.dtos';
import { CoinService } from '../services/coin.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Coins')
@Controller('coins')
export class CoinController {
  constructor(private coinService: CoinService) {}

  @ApiOperation({ summary: 'Total count of coins' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.coinService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of coins' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterCoinDto) {
    const user = req.user as PayloadToken;
    return this.coinService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One coin' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.coinService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create coins' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateCoinDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.coinService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update coins' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateCoinDto,
  ) {
    const user = req.user as PayloadToken;
    return this.coinService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove coins' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.coinService.delete(user.sub, rowid);
  }
}
