import {
  Controller,
  Delete,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';

import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from '../dtos/category.dtos';
import { CategoryService } from '../services/category.service';
import { PayloadToken } from '../../auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Total count of categories' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.categoryService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of categories' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterCategoryDto) {
    const user = req.user as PayloadToken;
    return this.categoryService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One category' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.categoryService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create categories' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateCategoryDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.categoryService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update categories' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    const user = req.user as PayloadToken;
    return this.categoryService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove categories' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.categoryService.delete(user.sub, rowid);
  }
}
