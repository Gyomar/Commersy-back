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
  CreateTypeDocumentDto,
  UpdateTypeDocumentDto,
  FilterTypeDocumentDto,
} from '../dtos/type_document.dtos';
import { TypeDocumentService } from '../services/type_document.service';
import { Request } from 'express';
import { PayloadToken } from 'src/modules/auth/models/token.model';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiTags('Types Documents')
@Controller('types-documents')
export class TypeDocumentController {
  constructor(private typeDocumentService: TypeDocumentService) {}

  @ApiOperation({ summary: 'Total count of types documents' })
  @Get('count')
  count(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.typeDocumentService.count(user.sub);
  }

  @ApiOperation({ summary: 'List of types documents' })
  @Get()
  get(@Req() req: Request, @Query() params: FilterTypeDocumentDto) {
    const user = req.user as PayloadToken;
    return this.typeDocumentService.findAll(user.sub, params);
  }

  @ApiOperation({ summary: 'One type document' })
  @Get(':rowid')
  getOne(@Req() req: Request, @Param('rowid', ParseIntPipe) rowid: number) {
    const user = req.user as PayloadToken;
    return this.typeDocumentService.findOne(user.sub, rowid);
  }

  @ApiOperation({ summary: 'Create types documents' })
  @Post()
  create(@Req() req: Request, @Body() payload: CreateTypeDocumentDto) {
    const user = req.user as PayloadToken;
    const updatedPayload = {
      ...payload,
      userRowid: user.sub.rowid,
    };
    return this.typeDocumentService.create(updatedPayload);
  }

  @ApiOperation({ summary: 'Update types documents' })
  @Patch(':rowid')
  update(
    @Req() req: Request,
    @Param('rowid') rowid: number,
    @Body() payload: UpdateTypeDocumentDto,
  ) {
    const user = req.user as PayloadToken;
    return this.typeDocumentService.update(user.sub, rowid, payload);
  }

  @ApiOperation({ summary: 'Remove types documents' })
  @Delete(':rowid')
  delete(@Req() req: Request, @Param('rowid') rowid: number) {
    const user = req.user as PayloadToken;
    return this.typeDocumentService.delete(user.sub, rowid);
  }
}
