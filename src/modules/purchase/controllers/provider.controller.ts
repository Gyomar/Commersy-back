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
  CreateProviderDto,
  UpdateProviderDto,
  FilterProviderDto,
} from '../dtos/provider.dtos';
import { ProviderService } from '../services/provider.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Providers')
@Controller('providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @ApiOperation({ summary: 'Total count of providers' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.providerService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of providers' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterProviderDto) {
    const user = req.user as PayloadToken;
    return this.providerService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One provider' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.providerService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create providers' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateProviderDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.providerService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update providers' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateProviderDto,
  ) {
    const user = req.user as PayloadToken;
    return this.providerService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove providers' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.providerService.delete(user.sub, rowid);
  }
}
