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

import { CreateZoneDto, UpdateZoneDto, FilterZoneDto } from '../dtos/zone.dtos';
import { ZoneService } from '../services/zone.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Zones')
@Controller('zones')
export class ZoneController {
  constructor(private zoneService: ZoneService) {}

  @ApiOperation({ summary: 'Total count of zones' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.zoneService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of zones' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterZoneDto) {
    const user = req.user as PayloadToken;
    return this.zoneService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One zone' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.zoneService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create zones' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateZoneDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.zoneService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update zones' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateZoneDto,
  ) {
    const user = req.user as PayloadToken;
    return this.zoneService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove zones' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.zoneService.delete(user.sub, rowid);
  }
}
