import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Expense } from '../entities/expense.entity';
import {
  CreateExpenseDto,
  UpdateExpenseDto,
  FilterExpenseDto,
} from '../dtos/expense.dtos';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense) private expenseRepo: Repository<Expense>,
  ) {}

  create(data: CreateExpenseDto) {
    const newExpense = this.expenseRepo.create({
      ...data,
      user: { rowid: data.userRowid },
    });
    return this.expenseRepo.save(newExpense);
  }

  async count(user: { rowid: number }) {
    const countData = await this.expenseRepo.count({
      where: { user },
    });
    return countData;
  }

  async findAll(user: { rowid: number }, params?: FilterExpenseDto) {
    if (params) {
      const { limit, offset } = params;
      return this.expenseRepo.find({
        where: { user },
        relations: ['purchase', 'paymentMethod', 'coin'],
        take: limit,
        skip: offset,
      });
    }

    return this.expenseRepo.find({
      where: { user },
      relations: ['purchase', 'paymentMethod', 'coin'],
    });
  }

  async findOne(user: { rowid: number }, rowid: number) {
    const expense = await this.expenseRepo.findOne({
      where: { user, rowid },
      relations: ['purchase', 'paymentMethod', 'coin'],
    });
    if (!expense) {
      throw new NotFoundException(`No exite`);
    }
    return expense;
  }

  async update(
    user: { rowid: number },
    rowid: number,
    changes: UpdateExpenseDto,
  ) {
    const expense = await this.expenseRepo.findOne({
      where: { user, rowid },
    });
    this.expenseRepo.merge(expense, changes);
    return this.expenseRepo.save(expense);
  }

  async delete(user: { rowid: number }, rowid: number) {
    const expense = await this.expenseRepo.findOne({
      where: { user, rowid },
    });
    return this.expenseRepo.delete(expense.rowid);
  }
}
