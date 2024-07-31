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
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
  FilterSubscriptionDto,
} from '../dtos/subscription.dtos';
import { SubscriptionService } from '../services/subscription.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.models';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Total count of subscriptions' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.subscriptionService.count(user.sub);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List of subscriptions' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterSubscriptionDto) {
    const user = req.user as PayloadToken;
    return this.subscriptionService.findAll(user.sub, params);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'One subscription' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.subscriptionService.findOne(user.sub, rowid);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create subscriptions' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateSubscriptionDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.subscriptionService.create(updatedPayload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update subscriptions' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateSubscriptionDto,
  ) {
    const user = req.user as PayloadToken;
    return this.subscriptionService.update(user.sub, rowid, payload);
  }

  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Remove subscriptions' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.subscriptionService.delete(user.sub, rowid);
  }
}
