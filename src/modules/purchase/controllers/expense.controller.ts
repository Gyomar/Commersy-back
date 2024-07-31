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
  CreateExpenseDto,
  UpdateExpenseDto,
  FilterExpenseDto,
} from '../dtos/expense.dtos';
import { ExpenseService } from '../services/expense.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Expenses')
@Controller('expenses')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @ApiOperation({ summary: 'Total count of expenses' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.expenseService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of expenses' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterExpenseDto) {
    const user = req.user as PayloadToken;
    return this.expenseService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One expense' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.expenseService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create expenses' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateExpenseDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.expenseService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update expenses' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateExpenseDto,
  ) {
    const user = req.user as PayloadToken;
    return this.expenseService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove expenses' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.expenseService.delete(user.sub, rowid);
  }
}
