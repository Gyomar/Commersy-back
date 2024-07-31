import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tax } from '../entities/tax.entity';
import { CreateTaxDto, UpdateTaxDto, FilterTaxDto } from '../dtos/tax.dtos';

@Injectable()
export class TaxService {
  constructor(@InjectRepository(Tax) private taxRepo: Repository<Tax>) {}

  create(data: CreateTaxDto) {
    const newTax = this.taxRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.taxRepo.save(newTax);
  }

  async count(user: { rowid: number }) {
    const countData = await this.taxRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterTaxDto) {
    if (params) {
      const { limit, offset } = params;
      return this.taxRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.taxRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const tax = await this.taxRepo.findOne({
      where: { user, rowid },
      relations: ['products'],
    });
    if (!tax) {
      throw new NotFoundException(`No exite`);
    }
    return tax;
  }

  async update(user: { rowid: number }, rowid: number, changes: UpdateTaxDto) {
    const tax = await this.taxRepo.findOne({
      where: { user, rowid },
    });
    this.taxRepo.merge(tax, changes);
    return this.taxRepo.save(tax);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const tax = await this.taxRepo.findOne({
      where: { user, rowid },
    });
    return this.taxRepo.delete(tax.rowid);
  }
}
