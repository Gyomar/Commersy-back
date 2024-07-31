import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductSale } from '../entities/product_sale.entity';
import {
  CreateProductSaleDto,
  UpdateProductSaleDto,
  FilterProductSaleDto,
} from '../dtos/product_sale.dtos';

@Injectable()
export class ProductSaleService {
  constructor(
    @InjectRepository(ProductSale)
    private productSaleRepo: Repository<ProductSale>,
  ) {}

  create(data: CreateProductSaleDto) {
    const newProductSale = this.productSaleRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.productSaleRepo.save(newProductSale);
  }

  async count(user: { rowid: number }) {
    const countData = await this.productSaleRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProductSaleDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productSaleRepo.find({
        where: { user },
        relations: ['sale', 'product'],
        take: limit,
        skip: offset,
      });
    }

    return this.productSaleRepo.find({
      where: { user },
      relations: ['sale', 'product'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const productSale = await this.productSaleRepo.findOne({
      where: { user, rowid },
      relations: ['sale', 'product'],
    });
    if (!productSale) {
      throw new NotFoundException(`No exite`);
    }
    return productSale;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProductSaleDto,
  ) {
    const productSale = await this.productSaleRepo.findOne({
      where: { user, rowid },
    });
    this.productSaleRepo.merge(productSale, changes);
    return this.productSaleRepo.save(productSale);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const productSale = await this.productSaleRepo.findOne({
      where: { user, rowid },
    });
    return this.productSaleRepo.delete(productSale.rowid);
  }
}
