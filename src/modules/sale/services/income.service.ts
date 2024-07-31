import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Income } from '../entities/income.entity';
import {
  CreateIncomeDto,
  UpdateIncomeDto,
  FilterIncomeDto,
} from '../dtos/income.dtos';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income) private incomeRepo: Repository<Income>,
  ) {}

  create(data: CreateIncomeDto) {
    const newIncome = this.incomeRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.incomeRepo.save(newIncome);
  }

  async count(user: { rowid: number }) {
    const countData = await this.incomeRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterIncomeDto) {
    if (params) {
      const { limit, offset } = params;
      return this.incomeRepo.find({
        where: { user },
        relations: ['sale', 'paymentMethod', 'coin'],
        take: limit,
        skip: offset,
      });
    }

    return this.incomeRepo.find({
      where: { user },
      relations: ['sale', 'paymentMethod', 'coin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const income = await this.incomeRepo.findOne({
      where: { user, rowid },
      relations: ['sale', 'paymentMethod', 'coin'],
    });
    if (!income) {
      throw new NotFoundException(`No exite`);
    }
    return income;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateIncomeDto,
  ) {
    const income = await this.incomeRepo.findOne({
      where: { user, rowid },
    });
    this.incomeRepo.merge(income, changes);
    return this.incomeRepo.save(income);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const income = await this.incomeRepo.findOne({
      where: { user, rowid },
    });
    return this.incomeRepo.delete(income.rowid);
  }
}
