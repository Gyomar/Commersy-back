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
  CreateIncomeDto,
  UpdateIncomeDto,
  FilterIncomeDto,
} from '../dtos/income.dtos';
import { IncomeService } from '../services/income.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Incomes')
@Controller('incomes')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @ApiOperation({ summary: 'Total count of incomes' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.incomeService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of incomes' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterIncomeDto) {
    const user = req.user as PayloadToken;
    return this.incomeService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One income' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.incomeService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create incomes' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateIncomeDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.incomeService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update incomes' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateIncomeDto,
  ) {
    const user = req.user as PayloadToken;
    return this.incomeService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove incomes' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.incomeService.delete(user.sub, rowid);
  }
}
