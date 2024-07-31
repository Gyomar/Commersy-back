import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TypeDocument } from '../entities/type_document.entity';
import {
  CreateTypeDocumentDto,
  UpdateTypeDocumentDto,
  FilterTypeDocumentDto,
} from '../dtos/type_document.dtos';

@Injectable()
export class TypeDocumentService {
  constructor(
    @InjectRepository(TypeDocument)
    private typeDocumentRepo: Repository<TypeDocument>,
  ) {}

  create(data: CreateTypeDocumentDto) {
    const newTypeDocument = this.typeDocumentRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.typeDocumentRepo.save(newTypeDocument);
  }

  async count(user: { rowid: number }) {
    const countData = await this.typeDocumentRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterTypeDocumentDto) {
    if (params) {
      const { limit, offset } = params;
      return this.typeDocumentRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.typeDocumentRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const typeDocument = await this.typeDocumentRepo.findOne({
      where: { user, rowid },
      relations: ['providers', 'customers'],
    });
    if (!typeDocument) {
      throw new NotFoundException(`No exite`);
    }
    return typeDocument;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateTypeDocumentDto,
  ) {
    const typeDocument = await this.typeDocumentRepo.findOne({
      where: { user, rowid },
    });
    this.typeDocumentRepo.merge(typeDocument, changes);
    return this.typeDocumentRepo.save(typeDocument);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const typeDocument = await this.typeDocumentRepo.findOne({
      where: { user, rowid },
    });
    return this.typeDocumentRepo.delete(typeDocument.rowid);
  }
}
