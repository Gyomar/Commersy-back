import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExchangeRate } from '../entities/exchange_rate.entity';
import {
  CreateExchangeRateDto,
  UpdateExchangeRateDto,
  FilterExchangeRateDto,
} from '../dtos/exchange_rate.dtos';

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(ExchangeRate)
    private exchangeRateRepo: Repository<ExchangeRate>,
  ) {}

  create(data: CreateExchangeRateDto) {
    const newExchangeRate = this.exchangeRateRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.exchangeRateRepo.save(newExchangeRate);
  }

  async count(user: { rowid: number }) {
    const countData = await this.exchangeRateRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterExchangeRateDto) {
    if (params) {
      const { limit, offset } = params;
      return this.exchangeRateRepo.find({
        where: { user },
        relations: ['fromCoin', 'toCoin'],
        take: limit,
        skip: offset,
      });
    }

    return this.exchangeRateRepo.find({
      where: { user },
      relations: ['fromCoin', 'toCoin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const exchangeRate = await this.exchangeRateRepo.findOne({
      where: { user, rowid },
      relations: ['fromCoin', 'toCoin'],
    });
    if (!exchangeRate) {
      throw new NotFoundException(`No exite`);
    }
    return exchangeRate;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateExchangeRateDto,
  ) {
    const exchangeRate = await this.exchangeRateRepo.findOne({
      where: { user, rowid },
    });
    this.exchangeRateRepo.merge(exchangeRate, changes);
    return this.exchangeRateRepo.save(exchangeRate);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const exchangeRate = await this.exchangeRateRepo.findOne({
      where: { user, rowid },
    });
    return this.exchangeRateRepo.delete(exchangeRate.rowid);
  }
}
