import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductPurchase } from '../entities/product_purchase.entity';
import {
  CreateProductPurchaseDto,
  UpdateProductPurchaseDto,
  FilterProductPurchaseDto,
} from '../dtos/product_purchase.dtos';

@Injectable()
export class ProductPurchaseService {
  constructor(
    @InjectRepository(ProductPurchase)
    private productPurchaseRepo: Repository<ProductPurchase>,
  ) {}

  create(data: CreateProductPurchaseDto) {
    const newProductPurchase = this.productPurchaseRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.productPurchaseRepo.save(newProductPurchase);
  }

  async count(user: { rowid: number }) {
    const countData = await this.productPurchaseRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProductPurchaseDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productPurchaseRepo.find({
        where: { user },
        relations: ['purchase', 'product'],
        take: limit,
        skip: offset,
      });
    }

    return this.productPurchaseRepo.find({
      where: { user },
      relations: ['purchase', 'product'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const productPurchase = await this.productPurchaseRepo.findOne({
      where: { user, rowid },
      relations: ['purchase', 'product'],
    });
    if (!productPurchase) {
      throw new NotFoundException(`No exite`);
    }
    return productPurchase;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProductPurchaseDto,
  ) {
    const productPurchase = await this.productPurchaseRepo.findOne({
      where: { user, rowid },
    });
    this.productPurchaseRepo.merge(productPurchase, changes);
    return this.productPurchaseRepo.save(productPurchase);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const productPurchase = await this.productPurchaseRepo.findOne({
      where: { user, rowid },
    });
    return this.productPurchaseRepo.delete(productPurchase.rowid);
  }
}
