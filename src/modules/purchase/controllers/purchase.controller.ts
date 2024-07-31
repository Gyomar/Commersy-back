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
  CreatePurchaseDto,
  UpdatePurchaseDto,
  FilterPurchaseDto,
} from '../dtos/purchase.dtos';
import { PurchaseService } from '../services/purchase.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Purchases')
@Controller('purchases')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @ApiOperation({ summary: 'Total count of purchases' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.purchaseService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of purchases' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterPurchaseDto) {
    const user = req.user as PayloadToken;
    return this.purchaseService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One purchase' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.purchaseService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create purchases' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreatePurchaseDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.purchaseService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update purchases' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdatePurchaseDto,
  ) {
    const user = req.user as PayloadToken;
    return this.purchaseService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove purchases' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.purchaseService.delete(user.sub, rowid);
  }
}
