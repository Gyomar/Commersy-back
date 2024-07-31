import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductQuotation } from '../entities/product_quotation.entity';
import {
  CreateProductQuotationDto,
  UpdateProductQuotationDto,
  FilterProductQuotationDto,
} from '../dtos/product_quotation.dtos';

@Injectable()
export class ProductQuotationService {
  constructor(
    @InjectRepository(ProductQuotation)
    private productQuotationRepo: Repository<ProductQuotation>,
  ) {}

  create(data: CreateProductQuotationDto) {
    const newProductQuotation = this.productQuotationRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.productQuotationRepo.save(newProductQuotation);
  }

  async count(user: { rowid: number }) {
    const countData = await this.productQuotationRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterProductQuotationDto) {
    if (params) {
      const { limit, offset } = params;
      return this.productQuotationRepo.find({
        where: { user },
        relations: ['quotation', 'product'],
        take: limit,
        skip: offset,
      });
    }

    return this.productQuotationRepo.find({
      where: { user },
      relations: ['quotation', 'product'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const productQuotation = await this.productQuotationRepo.findOne({
      where: { user, rowid },
      relations: ['quotation', 'product'],
    });
    if (!productQuotation) {
      throw new NotFoundException(`No exite`);
    }
    return productQuotation;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateProductQuotationDto,
  ) {
    const productQuotation = await this.productQuotationRepo.findOne({
      where: { user, rowid },
    });
    this.productQuotationRepo.merge(productQuotation, changes);
    return this.productQuotationRepo.save(productQuotation);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const productQuotation = await this.productQuotationRepo.findOne({
      where: { user, rowid },
    });
    return this.productQuotationRepo.delete(productQuotation.rowid);
  }
}
