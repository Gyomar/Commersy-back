import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dtos/product.dtos';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create({
      ...data,
      user: { rowid: data.userRowid },
      subCategory: { rowid: data.subCategoryRowid },
      tax: { rowid: data.taxRowid },
    });
    return this.productRepo.save(newProduct);
  }

  async count(user: { rowid: number }) {
    const countData = await this.productRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProductDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productRepo.find({
        where: { user },
        relations: ['subCategory', 'tax'],
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({
      where: { user },
      relations: ['subCategory', 'tax'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const product = await this.productRepo.findOne({
      where: { user, rowid },
      relations: ['subCategory', 'tax', 'productPrices'],
    });
    if (!product) {
      throw new NotFoundException(`No exite`);
    }
    return product;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProductDto,
  ) {
    const product = await this.productRepo.findOne({
      where: { user, rowid },
    });
    const productChanges = {
      ...changes,
      subCategory: { rowid: changes.subCategoryRowid },
      tax: { rowid: changes.taxRowid },
    };
    this.productRepo.merge(product, productChanges);
    return this.productRepo.save(product);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const product = await this.productRepo.findOne({
      where: { user, rowid },
    });
    return this.productRepo.delete(product.rowid);
  }
}
