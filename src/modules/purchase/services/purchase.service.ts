import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Purchase } from '../entities/purchase.entity';
import {
  CreatePurchaseDto,
  UpdatePurchaseDto,
  FilterPurchaseDto,
} from '../dtos/purchase.dtos';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepo: Repository<Purchase>,
  ) {}

  create(data: CreatePurchaseDto) {
    const newPurchase = this.purchaseRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.purchaseRepo.save(newPurchase);
  }

  async count(user: { rowid: number }) {
    const countData = await this.purchaseRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterPurchaseDto) {
    if (params) {
      const { limit, offset } = params;
      return this.purchaseRepo.find({
        where: { user },
        relations: ['provider', 'coin', 'paymentCondition'],
        take: limit,
        skip: offset,
      });
    }

    return this.purchaseRepo.find({
      where: { user },
      relations: ['provider', 'coin', 'paymentCondition'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const purchase = await this.purchaseRepo.findOne({
      where: { user, rowid },
      relations: ['provider', 'coin', 'paymentCondition', 'productPurchases'],
    });
    if (!purchase) {
      throw new NotFoundException(`No exite`);
    }
    return purchase;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdatePurchaseDto,
  ) {
    const purchase = await this.purchaseRepo.findOne({
      where: { user, rowid },
    });
    this.purchaseRepo.merge(purchase, changes);
    return this.purchaseRepo.save(purchase);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const purchase = await this.purchaseRepo.findOne({
      where: { user, rowid },
    });
    return this.purchaseRepo.delete(purchase.rowid);
  }
}
