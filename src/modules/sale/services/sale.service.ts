import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sale } from '../entities/sale.entity';
import { CreateSaleDto, UpdateSaleDto, FilterSaleDto } from '../dtos/sale.dtos';

@Injectable()
export class SaleService {
  constructor(@InjectRepository(Sale) private saleRepo: Repository<Sale>) {}

  create(data: CreateSaleDto) {
    const newSale = this.saleRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.saleRepo.save(newSale);
  }

  async count(user: { rowid: number }) {
    const countData = await this.saleRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterSaleDto) {
    if (params) {
      const { limit, offset } = params;
      return this.saleRepo.find({
        where: { user },
        relations: ['customer', 'priceList', 'coin'],
        take: limit,
        skip: offset,
      });
    }

    return this.saleRepo.find({
      where: { user },
      relations: ['customer', 'priceList', 'coin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const sale = await this.saleRepo.findOne({
      where: { user, rowid },
      relations: ['customer', 'priceList', 'coin', 'productSales'],
    });
    if (!sale) {
      throw new NotFoundException(`No exite`);
    }
    return sale;
  }

  async update(user: { rowid: number }, rowid: number, changes: UpdateSaleDto) {
    const sale = await this.saleRepo.findOne({
      where: { user, rowid },
    });
    this.saleRepo.merge(sale, changes);
    return this.saleRepo.save(sale);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const sale = await this.saleRepo.findOne({
      where: { user, rowid },
    });
    return this.saleRepo.delete(sale.rowid);
  }
}
