import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Coin } from '../entities/coin.entity';
import { CreateCoinDto, UpdateCoinDto, FilterCoinDto } from '../dtos/coin.dtos';

@Injectable()
export class CoinService {
  constructor(@InjectRepository(Coin) private coinRepo: Repository<Coin>) {}

  create(data: CreateCoinDto) {
    const newCoin = this.coinRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.coinRepo.save(newCoin);
  }

  async count(user: { rowid: number }) {
    const countData = await this.coinRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterCoinDto) {
    if (params) {
      const { limit, offset } = params;
      return this.coinRepo.find({
        where: { user },
        take: limit,
        skip: offset,
      });
    }

    return this.coinRepo.find({
      where: { user },
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const coin = await this.coinRepo.findOne({
      where: { user, rowid },
    });
    if (!coin) {
      throw new NotFoundException(`No exite`);
    }
    return coin;
  }

  async update(user: { rowid: number }, rowid: number, changes: UpdateCoinDto) {
    const coin = await this.coinRepo.findOne({
      where: { user, rowid },
    });
    this.coinRepo.merge(coin, changes);
    return this.coinRepo.save(coin);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const coin = await this.coinRepo.findOne({
      where: { user, rowid },
    });
    return this.coinRepo.delete(coin.rowid);
  }
}
