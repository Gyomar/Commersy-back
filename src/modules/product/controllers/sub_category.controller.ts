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
  CreateSubCategoryDto,
  UpdateSubCategoryDto,
  FilterSubCategoryDto,
} from '../dtos/sub_category.dtos';
import { SubCategoryService } from '../services/sub_category.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('SubCategories')
@Controller('sub-categories')
export class SubCategoryController {
  constructor(private subSubCategoryService: SubCategoryService) {}

  @ApiOperation({ summary: 'Total count of subCategories' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.subSubCategoryService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of subCategories' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterSubCategoryDto) {
    const user = req.user as PayloadToken;
    return this.subSubCategoryService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One subSubCategory' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.subSubCategoryService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create subCategories' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateSubCategoryDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.subSubCategoryService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update subCategories' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateSubCategoryDto,
  ) {
    const user = req.user as PayloadToken;
    return this.subSubCategoryService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove subCategories' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.subSubCategoryService.delete(user.sub, rowid);
  }
}
