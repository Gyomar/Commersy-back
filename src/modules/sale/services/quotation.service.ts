import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Quotation } from '../entities/quotation.entity';
import {
  CreateQuotationDto,
  UpdateQuotationDto,
  FilterQuotationDto,
} from '../dtos/quotation.dtos';

@Injectable()
export class QuotationService {
  constructor(
    @InjectRepository(Quotation) private quotationRepo: Repository<Quotation>,
  ) {}

  create(data: CreateQuotationDto) {
    const newQuotation = this.quotationRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.quotationRepo.save(newQuotation);
  }

  async count(user: { rowid: number }) {
    const countData = await this.quotationRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterQuotationDto) {
    if (params) {
      const { limit, offset } = params;
      return this.quotationRepo.find({
        where: { user },
        relations: ['customer', 'priceList', 'coin'],
        take: limit,
        skip: offset,
      });
    }

    return this.quotationRepo.find({
      where: { user },
      relations: ['customer', 'priceList', 'coin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const quotation = await this.quotationRepo.findOne({
      where: { user, rowid },
      relations: ['customer', 'priceList', 'coin', 'productQuotations'],
    });
    if (!quotation) {
      throw new NotFoundException(`No exite`);
    }
    return quotation;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateQuotationDto,
  ) {
    const quotation = await this.quotationRepo.findOne({
      where: { user, rowid },
    });
    this.quotationRepo.merge(quotation, changes);
    return this.quotationRepo.save(quotation);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const quotation = await this.quotationRepo.findOne({
      where: { user, rowid },
    });
    return this.quotationRepo.delete(quotation.rowid);
  }
}
