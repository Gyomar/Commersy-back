import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PriceList } from '../entities/price_list.entity';
import {
  CreatePriceListDto,
  UpdatePriceListDto,
  FilterPriceListDto,
} from '../dtos/price_list.dtos';

@Injectable()
export class PriceListService {
  constructor(
    @InjectRepository(PriceList) private priceListRepo: Repository<PriceList>,
  ) {}

  create(data: CreatePriceListDto) {
    const newPriceList = this.priceListRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.priceListRepo.save(newPriceList);
  }

  async count(user: { rowid: number }) {
    const countData = await this.priceListRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterPriceListDto) {
    if (params) {
      const { limit, offset } = params;
      return this.priceListRepo.find({
        where: { user },
        relations: ['coin'],
        take: limit,
        skip: offset,
      });
    }

    return this.priceListRepo.find({
      where: { user },
      relations: ['coin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const priceList = await this.priceListRepo.findOne({
      where: { user, rowid },
      relations: ['coin', 'productPrices'],
    });
    if (!priceList) {
      throw new NotFoundException(`No exite`);
    }
    return priceList;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdatePriceListDto,
  ) {
    const priceList = await this.priceListRepo.findOne({
      where: { user, rowid },
    });
    this.priceListRepo.merge(priceList, changes);
    return this.priceListRepo.save(priceList);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const priceList = await this.priceListRepo.findOne({
      where: { user, rowid },
    });
    return this.priceListRepo.delete(priceList.rowid);
  }
}
