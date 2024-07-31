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
  CreateQuotationDto,
  UpdateQuotationDto,
  FilterQuotationDto,
} from '../dtos/quotation.dtos';
import { QuotationService } from '../services/quotation.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Quotations')
@Controller('quotations')
export class QuotationController {
  constructor(private quotationService: QuotationService) {}

  @ApiOperation({ summary: 'Total count of quotations' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.quotationService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of quotations' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterQuotationDto) {
    const user = req.user as PayloadToken;
    return this.quotationService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One quotation' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.quotationService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create quotations' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateQuotationDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.quotationService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update quotations' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateQuotationDto,
  ) {
    const user = req.user as PayloadToken;
    return this.quotationService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove quotations' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.quotationService.delete(user.sub, rowid);
  }
}
