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

import { CreateTaxDto, UpdateTaxDto, FilterTaxDto } from '../dtos/tax.dtos';
import { TaxService } from '../services/tax.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Taxes')
@Controller('taxes')
export class TaxController {
  constructor(private taxService: TaxService) {}

  @ApiOperation({ summary: 'Total count of taxes' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.taxService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of taxes' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterTaxDto) {
    const user = req.user as PayloadToken;
    return this.taxService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One tax' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.taxService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create taxes' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateTaxDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.taxService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update taxes' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateTaxDto,
  ) {
    const user = req.user as PayloadToken;
    return this.taxService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove taxes' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.taxService.delete(user.sub, rowid);
  }
}
