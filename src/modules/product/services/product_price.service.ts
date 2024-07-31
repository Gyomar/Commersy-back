import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductPrice } from '../entities/product_price.entity';
import {
  CreateProductPriceDto,
  UpdateProductPriceDto,
  FilterProductPriceDto,
} from '../dtos/product_price.dtos';

@Injectable()
export class ProductPriceService {
  constructor(
    @InjectRepository(ProductPrice)
    private productPriceRepo: Repository<ProductPrice>,
  ) {}

  create(data: CreateProductPriceDto) {
    const newProductPrice = this.productPriceRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.productPriceRepo.save(newProductPrice);
  }

  async count(user: { rowid: number }) {
    const countData = await this.productPriceRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProductPriceDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productPriceRepo.find({
        where: { user },
        relations: ['product', 'priceList'],
        take: limit,
        skip: offset,
      });
    }

    return this.productPriceRepo.find({
      where: { user },
      relations: ['product', 'priceList'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const productPrice = await this.productPriceRepo.findOne({
      where: { user, rowid },
      relations: ['product', 'priceList'],
    });
    if (!productPrice) {
      throw new NotFoundException(`No exite`);
    }
    return productPrice;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProductPriceDto,
  ) {
    const productPrice = await this.productPriceRepo.findOne({
      where: { user, rowid },
    });
    this.productPriceRepo.merge(productPrice, changes);
    return this.productPriceRepo.save(productPrice);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const productPrice = await this.productPriceRepo.findOne({
      where: { user, rowid },
    });
    return this.productPriceRepo.delete(productPrice.rowid);
  }
}
